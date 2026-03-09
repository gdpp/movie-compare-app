import { Box, Typography, Button, Stack } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useNavigate } from "react-router";
import ComparisonCard from "./ComparisonCard";
import { useRecentComparisons } from "../../hooks/useRecentComparisons";

const RecentComparisons = () => {
  const navigate = useNavigate();

  const { comparisons, loading } = useRecentComparisons();

  console.log("Recent Comparisons:", comparisons);
  if (loading) {
    return <Typography>Loading recent comparisons...</Typography>;
  }

  if (!comparisons.length) {
    return (
      <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
        No comparisons yet. Start comparing movies to see them here.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 6 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h7" fontWeight={600}>
          Recent Comparisons
        </Typography>

        <Button
          variant="contained"
          size="small"
          startIcon={<CompareArrowsIcon />}
          onClick={() => navigate("/compare")}
        >
          Compare
        </Button>
      </Stack>

      {/* Carousel */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,

          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 4,
          },
        }}
      >
        {comparisons.map((comparison, index) => (
          <ComparisonCard key={index} comparison={comparison} />
        ))}
      </Box>
    </Box>
  );
};

export default RecentComparisons;
