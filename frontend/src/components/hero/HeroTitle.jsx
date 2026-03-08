import { Box, Typography } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";

const HeroTitle = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
          }}
        >
          <MovieIcon
            sx={{
              fontSize: { xs: 36, md: 44 },
              color: "primary.main",
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
              fontSize: { xs: "2.2rem", md: "2.8rem", lg: "3.2rem" },
            }}
          >
            MovieScope
          </Typography>
        </Box>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 420,
            lineHeight: 1.6,
            fontSize: { xs: "0.95rem", md: "1.05rem" },
          }}
        >
          Search and explore movies, series, and episodes powered by the OMDb
          API.
        </Typography>
      </Box>
    </>
  );
};

export default HeroTitle;
