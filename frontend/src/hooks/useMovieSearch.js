import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../services/movieService";

export default function useMovieSearch(params) {
  return useQuery({
    queryKey: ["movie-search", params],
    queryFn: searchMovies,
    enabled: !!params?.s && params.s.length >= 2,
    staleTime: 1000 * 60 * 2,
  });
}
