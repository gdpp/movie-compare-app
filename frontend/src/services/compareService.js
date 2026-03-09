import movieApi from "../api/movieApi";

export const compareMovies = async (imdbIds) => {
  const response = await movieApi.post("/compare", {
    imdbIds,
  });

  return response.data;
};
