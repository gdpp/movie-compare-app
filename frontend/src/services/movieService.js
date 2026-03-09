import movieApi from "../api/movieApi";

export const searchMovies = async ({ queryKey, signal }) => {
  const [, params] = queryKey;

  const { data } = await movieApi.get("/search", {
    params,
    signal,
  });

  if (data?.Response === "False") {
    throw new Error(data?.Error);
  }

  return data;
};

export const getMovieById = async ({ queryKey, signal }) => {
  const [, imdbId] = queryKey;
  const { data } = await movieApi.get(`/movie/${imdbId}`, { signal });
  if (data?.Response === "False") {
    throw new Error(data?.Error ?? "Movie not found");
  }
  return data;
};
