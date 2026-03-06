import { Avatar, ListItem, ListItemText, Chip } from "@mui/material";

const MovieResultItem = ({ movie }) => {
  return (
    <ListItem
      sx={{
        py: 0.5,
        px: 1,
      }}
    >
      <Avatar
        src={movie.Poster}
        variant="rounded"
        sx={{
          width: 46,
          height: 46,
          mr: 1,
        }}
      />
      <ListItemText
        primary={movie.Title}
        secondary={movie.Year}
        slotProps={{
          primary: {
            fontSize: 12,
          },
          secondary: {
            fontSize: 11,
          },
        }}
      />
      <Chip
        label={movie.Type}
        size="small"
        sx={{
          height: 20,
          fontSize: 11,
        }}
      />
    </ListItem>
  );
};

export default MovieResultItem;
