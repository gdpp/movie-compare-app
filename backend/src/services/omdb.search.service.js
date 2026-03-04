import httpClient from "../utils/httpClient.js";

const API_KEY = process.env.OMDB_API_KEY;

export const searchMovies = async (params) => {
  const response = await httpClient.get("/", {
    params: {
      apikey: API_KEY,
      ...params,
    },
  });

  return response.data;
};
