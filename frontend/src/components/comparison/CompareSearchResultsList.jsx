import { Box, Typography, List, Skeleton } from "@mui/material";
import MovieResultItem from "../movies/MovieResultItem";

const CompareSearchResultsList = ({
  movies,
  loading,
  query,
  error,
  onSelectMovie,
}) => {
  if (!query?.trim()) return null;
  if (loading)
    return (
      <>
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </>
    );
  if (error || !movies?.length) return null;

  return (
    <List disablePadding>
      {movies.map((movie) => (
        <MovieResultItem
          key={movie.imdbID}
          movie={movie}
          onClick={() => onSelectMovie?.(movie)}
        />
      ))}
    </List>
  );
};

export default CompareSearchResultsList;
