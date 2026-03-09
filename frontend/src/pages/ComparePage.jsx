import { useLocation } from "react-router";
import { Typography, Box } from "@mui/material";

const ComparePage = () => {
  const { state } = useLocation();
  const initialMovie = state?.initialMovie;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Compare movies
      </Typography>
      {initialMovie && (
        <Typography color="text.secondary">
          You can compare &quot;{initialMovie.Title}&quot; with other movies.
          (Comparison UI coming next.)
        </Typography>
      )}
      {!initialMovie && (
        <Typography color="text.secondary">
          Add movies to compare from search or from here.
        </Typography>
      )}
    </Box>
  );
};

export default ComparePage;
