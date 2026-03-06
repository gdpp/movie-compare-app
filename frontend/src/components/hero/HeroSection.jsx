import { useState } from "react";
import { Box, Paper } from "@mui/material";
import MovieSearchInput from "./MovieSearchInput";
import SearchResultsList from "./SearchResultsList";
import useMovieSearch from "../../hooks/useMovieSearch";

const HeroSection = () => {
  const [query, setQuery] = useState("");

  const { data, isLoading } = useMovieSearch({
    s: query,
  });

  return (
    <Box position="relative">
      <MovieSearchInput onSearch={setQuery} />
      <Paper
        sx={{
          position: "absolute",
          width: "100%",
          zIndex: 10,
          maxHeight: 350,
          overflow: "auto",
          mt: 1,
          p: 1,
        }}
      >
        <SearchResultsList movies={data} loading={isLoading} query={query} />
      </Paper>
    </Box>
  );
};

export default HeroSection;
