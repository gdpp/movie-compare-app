import { getMovieById } from "../services/omdb.movie.service.js";

const imdbRegex = /^tt\d{7,8}$/;

export const getMovie = async (ctx) => {
  const { imdbId } = ctx.params;

  // Format validation
  if (!imdbRegex.test(imdbId)) {
    ctx.status = 400;
    ctx.body = {
      error: "Invalid IMDb ID format. Must be 'tt' followed by 7-8 digits",
    };

    return;
  }

  try {
    const data = await getMovieById(imdbId);

    if (data.Response === "False") {
      ctx.status = 404;
      ctx.body = {
        error: "Movie not found!",
      };

      return;
    }

    // Validation for series
    if (data.Type === "series" && data.totalSeasons) {
      data.totalSeasons = Number(data.totalSeasons);
    } else {
      delete data.totalSeasons;
    }

    ctx.status = 200;
    ctx.body = data;
  } catch (error) {
    ctx.throw(500, "External service error", error);
  }
};
