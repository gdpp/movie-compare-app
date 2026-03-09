import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const MovieCarousel = ({ movies, onRemove }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        overflowX: "auto",
        pb: 1,
      }}
    >
      {movies.map((movie) => (
        <Box
          key={movie.imdbID}
          sx={{
            minWidth: 120,
            position: "relative",
            textAlign: "center",
          }}
        >
          <IconButton
            size="small"
            onClick={() => onRemove(movie.imdbID)}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.8)",
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>

          <img
            src={movie.Poster}
            alt={movie.Title}
            style={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />

          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 0.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {movie.Title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MovieCarousel;
