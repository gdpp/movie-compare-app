import { List, Skeleton, Alert } from "@mui/material";
import MovieResultItem from "../movies/MovieResultItem";

const SearchResultsList = ({ movies, loading, query }) => {
  if (!query) return null;

  if (loading)
    return (
      <>
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </>
    );

  if (!movies?.length) return <Alert severity="error">Movie not found.</Alert>;

  return (
    <List>
      {movies.map((movie) => (
        <MovieResultItem key={movie.imdbID} movie={movie} />
      ))}
    </List>
  );
};

export default SearchResultsList;
