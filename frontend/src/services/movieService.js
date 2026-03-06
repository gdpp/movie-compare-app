import movieApi from "../api/movieApi";

export const searchMovies = async ({ queryKey, signal }) => {
  const [, params] = queryKey;

  const { data } = await movieApi.get("/search", {
    params,
    signal,
  });

  // if (data.Response === "False") {
  //   throw new Error(error.response.data.Error);
  // }

  return data;
};
