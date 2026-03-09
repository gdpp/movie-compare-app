import { useState, useRef, useEffect } from "react";
import { Box, Container, Paper, Alert } from "@mui/material";
import MovieSearchInput from "./MovieSearchInput";
import SearchResultsList from "./SearchResultsList";
import useMovieSearch from "../../hooks/useMovieSearch";
import HeroTitle from "./HeroTitle";
import RecentComparisons from "../comparisons/RecentComparisons";
import { useMovieModal } from "../../hooks/useMovieModal";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const searchAreaRef = useRef(null);
  const { open } = useMovieModal();

  const onSelectMovie = (movie) => {
    if (movie?.imdbID) {
      open(movie.imdbID);
      setDropdownOpen(false);
    }
  };

  const { data, isLoading, error } = useMovieSearch({
    s: query,
  });

  const hasQuery = query?.trim().length >= 2;
  const hasResults = hasQuery && !error && data?.Search?.length > 0;
  const showDropdown = hasResults && dropdownOpen;

  const onSearch = (value) => {
    setQuery(value);
    setDropdownOpen(true);
  };

  useEffect(() => {
    const fn = (e) => {
      if (searchAreaRef.current && !searchAreaRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
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
            onSearch={onSearch}
            onFocus={() => hasResults && setDropdownOpen(true)}
          />

          {showDropdown && (
            <Paper
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                zIndex: 10,
                maxHeight: 320,
                overflow: "auto",
                mt: 1,
              }}
            >
              <SearchResultsList
                movies={data?.Search}
                loading={isLoading}
                query={query}
                error={error}
                onSelectMovie={onSelectMovie}
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
