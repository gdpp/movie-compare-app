import { useState, useRef, useEffect, useCallback } from "react";
import { Box, Container, Paper, Alert } from "@mui/material";
import MovieSearchInput from "./MovieSearchInput";
import SearchResultsList from "./SearchResultsList";
import useMovieSearch from "../../hooks/useMovieSearch";
import HeroTitle from "./HeroTitle";
import RecentComparisons from "../comparisons/RecentComparisons";
import { useMovieModal } from "../../hooks/useMovieModal";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [userClosedDropdown, setUserClosedDropdown] = useState(false);
  const searchAreaRef = useRef(null);
  const { openMovieModal } = useMovieModal();

  const handleSelectMovie = useCallback(
    (movie) => {
      if (movie?.imdbID) {
        openMovieModal(movie.imdbID);
        setUserClosedDropdown(true);
      }
    },
    [openMovieModal],
  );

  const { data, isLoading, error } = useMovieSearch({
    s: query,
  });

  const hasQuery = query?.trim().length >= 2;
  const hasResults = Boolean(hasQuery && !error && data?.Search?.length > 0);
  const showDropdown = hasResults && !userClosedDropdown;

  const handleSearch = (value) => {
    setQuery(value);
    setUserClosedDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchAreaRef.current && !searchAreaRef.current.contains(e.target)) {
        setUserClosedDropdown(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Container maxWidth="lg" position="relative">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          minHeight: {
            xs: "auto",
            md: "80vh",
          },

          justifyContent: {
            xs: "flex-start",
            md: "space-between",
          },
        }}
      >
        {/* HERO AREA */}
        <Box ref={searchAreaRef} sx={{ position: "relative" }}>
          <HeroTitle />

          <MovieSearchInput
            onSearch={handleSearch}
            onFocus={() => hasResults && setUserClosedDropdown(false)}
          />

          {showDropdown && (
            <Paper
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                width: "100%",
                zIndex: 10,
                maxHeight: "min(350px, 55vh)",
                overflow: "auto",
                mt: 1,
              }}
            >
              <SearchResultsList
                key={query}
                movies={data?.Search}
                loading={isLoading}
                query={query}
                error={error}
                onClose={() => setUserClosedDropdown(true)}
                onSelectMovie={handleSelectMovie}
              />
            </Paper>
          )}

          {hasQuery && error && (
            <Alert size="small" severity="error" sx={{ mt: 1 }}>
              {error.response.data.Error}
            </Alert>
          )}
        </Box>

        {/* RECENT COMPARISONS */}
        <RecentComparisons />
      </Box>
    </Container>
  );
};

export default HeroSection;
