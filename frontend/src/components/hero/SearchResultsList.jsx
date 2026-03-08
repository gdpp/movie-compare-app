import { List, Skeleton } from "@mui/material";
import MovieResultItem from "../movies/MovieResultItem";

const SearchResultsList = ({ movies, loading, query, error }) => {
  if (!query?.trim()) return null;

  if (loading)
    return (
      <>
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </>
    );

  if (!movies?.length) return null;

  if (error) return null;

  return (
    <List>
      {movies.map((movie) => (
        <MovieResultItem key={movie.imdbID} movie={movie} />
      ))}
    </List>
  );
};

export default SearchResultsList;
