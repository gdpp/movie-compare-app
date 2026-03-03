import { searchMovies } from "../services/omdb.service.js";

export const search = async (ctx) => {
  // s => search query
  // y => year
  const { s, type, y, page } = ctx.query;

  // Required parameter
  if (!s) {
    ctx.status = 400;
    ctx.body = {
      Response: "False",
      Error: "Search parameter 's' is required",
    };

    return;
  }

  if (page && page < 1) {
    ctx.status = 400;
    ctx.body = {
      Response: "False",
      Error: "Page must be greater than 0",
    };

    return;
  }

  const data = await searchMovies({ s, type, y, page });

  if (data.Response === "False") {
    ctx.status = 404;
    ctx.body = {
      Response: "False",
      Error: "Movie not found!",
    };

    return;
  }

  ctx.status = 200;
  ctx.body = data;
};
