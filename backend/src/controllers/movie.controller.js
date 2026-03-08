import logger from "../utils/logger.js";
import { getMovieById } from "../services/omdb.movie.service.js";
import { isValidImdbId } from "../utils/imdb.js";

export const getMovie = async (ctx) => {
  const { imdbId } = ctx.params;

  // Format validation
  if (!isValidImdbId(imdbId)) {
    ctx.status = 400;
    ctx.body = {
      Response: "False",
      Error: "Invalid IMDb ID format. Must be 'tt' followed by 7-8 digits",
    };

    return;
  }

  try {
    const data = await getMovieById(imdbId);

    if (data.Response === "False") {
      ctx.status = 404;
      ctx.body = {
        Response: "False",
        Error: "Movie not found!",
      };

      return;
    }

    // Validation for series
    if (data.Type === "series" && data.totalSeasons) {
      data.totalSeasons = Number(data.totalSeasons);
    } else {
      delete data.totalSeasons;
    }

    logger.info(
      {
        imdbId: ctx.params.imdbId,
        ip: ctx.ip,
      },
      "Fetching movie details",
    );

    ctx.status = 200;
    ctx.body = data;
  } catch (error) {
    logger.error(error, "External service error");
    ctx.throw(500, "External service error", error);
  }
};
