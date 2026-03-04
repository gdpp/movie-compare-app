import httpClient from "../utils/httpClient.js";

const API_KEY = process.env.OMDB_API_KEY;

export const getMovieById = async (imdbId) => {
  const response = await httpClient.get("/", {
    params: {
      apikey: API_KEY,
      i: imdbId,
      plot: "full",
    },
  });

  return response.data;
};
