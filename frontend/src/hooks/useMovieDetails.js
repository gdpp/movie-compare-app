import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../services/movieService";

export default function useMovieDetails(imdbId) {
  return useQuery({
    queryKey: ["movie-details", imdbId],
    queryFn: getMovieById,
    enabled: !!imdbId,
    staleTime: 1000 * 60 * 2,
  });
}
