import { useState, useEffect, useRef } from "react";
import { Box, Container } from "@mui/material";
import AddMovieModal from "./AddMovieModal";
import MovieCarousel from "./MovieCarousel";
import RatingChart from "./RatingChart";
import { useCompare } from "../../context/CompareContext";
import { useMovieComparison } from "../../hooks/useMovieCompare";

const CompareSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { movies, addMovie, removeMovie } = useCompare();

  const { comparison, runComparison } = useMovieComparison();

  const handleAddMovie = (movie) => {
    addMovie(movie);
    setModalOpen(false);
  };

  const lastIds = useRef("");

  useEffect(() => {
    if (movies.length < 2) return;

    const ids = movies.map((m) => m.imdbID).join(",");

    if (ids === lastIds.current) return;

    lastIds.current = ids;

    runComparison(ids.split(","));
  }, [movies, runComparison]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {comparison && (
          <RatingChart movies={comparison.movies} comparison={comparison} />
        )}
      </Box>

      <MovieCarousel
        movies={movies}
        onRemove={removeMovie}
        onAddMovie={() => setModalOpen(true)}
      />

      <AddMovieModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddMovie={handleAddMovie}
      />
    </Container>
  );
};

export default CompareSection;
