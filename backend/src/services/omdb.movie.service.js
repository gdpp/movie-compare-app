import httpClient from "../utils/httpClient.js";

import logger from "../utils/logger.js";
import cache from "../utils/cache.js";

const API_KEY = process.env.OMDB_API_KEY;

export const getMovieById = async (imdbId) => {
  const cacheKey = `movie:${imdbId}`;

  const cached = cache.get(cacheKey);

  if (cached) {
    logger.info({ cacheKey }, "Cache hit");
    return cached;
  }

  const response = await httpClient.get("/", {
    params: {
      apikey: API_KEY,
      i: imdbId,
      plot: "short",
    },
  });

  cache.set(cacheKey, response.data);

  return response.data;
};
