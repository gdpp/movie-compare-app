import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";

const ComparisonCard = ({ comparison }) => {
  const { titles, movieCount, comparedAt } = comparison;

  const formattedDate = new Date(comparedAt).toLocaleDateString();

  return (
    <Card
      sx={{
        minWidth: 220,
        maxWidth: 220,
        flexShrink: 0,
        transition: "all 0.2s",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          {movieCount} Movies
        </Typography>

        <Stack spacing={0.5} sx={{ mb: 1 }}>
          {titles.map((title) => (
            <Chip key={title} label={title} size="small" variant="outlined" />
          ))}
        </Stack>

        <Typography variant="caption" color="text.secondary">
          {formattedDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ComparisonCard;
