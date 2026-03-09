import { useState, useRef, useEffect } from "react";
import { Modal, Box, Paper, Typography, Button } from "@mui/material";
import MovieSearchInput from "../hero/MovieSearchInput";
import CompareSearchResultsList from "./CompareSearchResultsList";
import useMovieSearch from "../../hooks/useMovieSearch";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

const AddMovieModal = ({ open, onClose, onAddMovie }) => {
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchAreaRef = useRef(null);

  const { data, isLoading, error } = useMovieSearch(
    { s: query },
    { enabled: query.trim().length >= 2 },
  );

  const hasQuery = query?.trim().length >= 2;
  const hasResults = hasQuery && !error && data?.Search?.length > 0;
  const showDropdown = hasResults && dropdownOpen;

  const onSearch = (value) => {
    setQuery(value);
    setDropdownOpen(true);
  };

  const handleSelectMovie = (movie) => {
    if (!movie?.imdbID) return;

    onAddMovie(movie);
    setDropdownOpen(false);
    setQuery("");
  };

  useEffect(() => {
    const fn = (e) => {
      if (searchAreaRef.current && !searchAreaRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add movie to comparison
        </Typography>

        <Box ref={searchAreaRef} sx={{ position: "relative" }}>
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
              <CompareSearchResultsList
                movies={data?.Search}
                loading={isLoading}
                query={query}
                error={error}
                onSelectMovie={handleSelectMovie}
              />
            </Paper>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button onClick={onClose}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddMovieModal;
