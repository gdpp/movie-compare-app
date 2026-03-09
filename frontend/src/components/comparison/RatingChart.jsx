import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const RatingChart = ({ movies, comparison, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!comparison || !movies?.length) {
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h6" color="text.secondary">
          Add at least 2 movies to compare ratings
        </Typography>
      </Box>
    );
  }

  const data = movies.map((movie) => ({
    title: movie.Title,
    imdb: Number(movie.imdbRating),
    metascore: Number(movie.Metascore),
  }));

  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 2, textAlign: "center" }}
        >
          Movie Rating Comparison
        </Typography>

        <Box sx={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="title" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />

              <Bar dataKey="imdb" name="IMDb Rating" fill="#f5c518" />
              <Bar dataKey="metascore" name="Metascore" fill="#4cafef" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RatingChart;
