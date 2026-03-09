import { useNavigate } from "react-router";
import {
  Modal,
  Box,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import useMovieDetails from "../../hooks/useMovieDetails";
import { useMovieModal } from "../../hooks/useMovieModal";

const FIELDS = [
  ["Rated", "Rated"],
  ["Director", "Director"],
  ["Writers", "Writer"],
  ["Cast", "Actors"],
  ["Runtime", "Runtime"],
  ["Language", "Language"],
  ["Country", "Country"],
  ["Box Office", "BoxOffice"],
  ["Awards", "Awards"],
  ["Release Date", "Released"],
];

function getRating(ratings, name) {
  const r = ratings?.find((x) => (x.Source || "").toLowerCase().includes(name));
  return r?.Value ?? null;
}

export default function MovieDetailModal() {
  const { selectedMovieId, close } = useMovieModal();
  const navigate = useNavigate();
  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useMovieDetails(selectedMovieId ?? "");
  const open = Boolean(selectedMovieId);

  const onCompare = () => {
    if (movie) {
      close();
      navigate("/compare", { state: { initialMovie: movie } });
    }
  };

  return (
    <Modal
      open={open}
      onClose={close}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(8px)",
          bgcolor: "rgba(0,0,0,0.75)",
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 800,
          width: "100%",
          maxHeight: "90vh",
          overflow: "scroll",
          position: "relative",
          borderRadius: 3,
          boxShadow: 24,
          bgcolor: "background.paper",
        }}
      >
        <IconButton
          onClick={close}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            zIndex: 2,
            bgcolor: "rgba(0,0,0,0.5)",
            color: "white",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          <CloseIcon />
        </IconButton>

        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 400,
              p: 6,
            }}
          >
            <CircularProgress size={48} />
          </Box>
        )}

        {isError && (
          <Alert severity="error" onClose={close} sx={{ m: 2 }}>
            {error?.message ?? "No se pudo cargar la película."}
          </Alert>
        )}

        {movie && !isLoading && !isError && (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              p: 3,
              gap: 3,
            }}
          >
            {/* Columna izquierda: póster + botón */}
            <Box sx={{ flexShrink: 0 }}>
              {movie.Poster && movie.Poster !== "N/A" ? (
                <Box
                  component="img"
                  src={movie.Poster}
                  alt={movie.Title}
                  sx={{
                    width: 220,
                    borderRadius: 2,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
                    display: "block",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 220,
                    height: 330,
                    borderRadius: 2,
                    bgcolor: "action.hover",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Sin póster
                  </Typography>
                </Box>
              )}
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<CompareArrowsIcon />}
                onClick={onCompare}
                sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
              >
                Comparar
              </Button>
            </Box>

            {/* Columna derecha: título, ratings, sinopsis, ficha */}
            <Box sx={{ flex: 1, minWidth: 0, overflow: "auto" }}>
              <Typography
                component="h2"
                variant="h5"
                sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}
              >
                {movie.Title}
              </Typography>
              {(movie.Year || movie.Genre) && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1.5 }}
                >
                  {[movie.Year, movie.Genre !== "N/A" && movie.Genre]
                    .filter(Boolean)
                    .join(" · ")}
                </Typography>
              )}

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                {movie.imdbRating && movie.imdbRating !== "N/A" && (
                  <Chip
                    label={
                      movie.imdbVotes && movie.imdbVotes !== "N/A"
                        ? `IMDb ${movie.imdbRating} (${movie.imdbVotes} votos)`
                        : `IMDb ${movie.imdbRating}`
                    }
                    size="medium"
                    sx={{ bgcolor: "#f5c518", color: "#000", fontWeight: 700 }}
                  />
                )}
                {getRating(movie.Ratings, "rotten") && (
                  <Chip
                    label={`RT ${getRating(movie.Ratings, "rotten")}`}
                    size="medium"
                    sx={{
                      bgcolor: "error.main",
                      color: "error.contrastText",
                      fontWeight: 600,
                    }}
                  />
                )}
                {movie.Metascore && movie.Metascore !== "N/A" && (
                  <Chip
                    label={`Metascore ${movie.Metascore}`}
                    size="medium"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                )}
              </Box>

              {movie.Plot && movie.Plot !== "N/A" && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 0.5, fontWeight: 600 }}
                  >
                    Sinopsis
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    {movie.Plot}
                  </Typography>
                </Box>
              )}

              {FIELDS.map(([label, key]) => {
                const val = movie[key];
                if (val == null || val === "" || val === "N/A") return null;
                const text =
                  key === "Actors"
                    ? val.split(",").slice(0, 8).join(", ")
                    : val;
                return (
                  <Box key={key} sx={{ mb: 1 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontWeight: 600 }}
                    >
                      {label}
                    </Typography>
                    <Typography
                      variant="body2"
                      display="block"
                      sx={{ mt: 0.25 }}
                    >
                      {text}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
