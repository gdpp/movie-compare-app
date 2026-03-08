import { useState } from "react";
import { Box, Container, Paper, Alert } from "@mui/material";
import MovieSearchInput from "./MovieSearchInput";
import SearchResultsList from "./SearchResultsList";
import useMovieSearch from "../../hooks/useMovieSearch";
import HeroTitle from "./HeroTitle";
import RecentComparisons from "../comparisons/RecentComparisons";

const HeroSection = () => {
  const [query, setQuery] = useState("");

  const { data, isLoading, error } = useMovieSearch({
    s: query,
  });

  const hasQuery = query?.trim().length >= 2;

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
        <Box>
          <HeroTitle />

          <MovieSearchInput onSearch={setQuery} />

          {hasQuery && !error && data?.Search?.length > 0 && (
            <Paper
              sx={{
                position: "absolute",
                width: "100%",
                zIndex: 10,
                maxHeight: 350,
                overflow: "auto",
                mt: 1,
              }}
            >
              <SearchResultsList
                movies={data?.Search}
                loading={isLoading}
                query={query}
                error={error}
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
