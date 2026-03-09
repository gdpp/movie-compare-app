import logger from "../utils/logger.js";

import { searchMovies } from "../services/omdb.search.service.js";

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

  if (page != null && page !== "" && Number(page) < 1) {
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
    ctx.body = data;

    logger.error({ error: data.Error, query: s }, "Search failed");

    return;
  }

  logger.info(
    {
      query: ctx.query.s,
      page: ctx.query.page,
      type: ctx.query.type,
      ip: ctx.ip,
    },
    "Movie search request",
  );

  ctx.status = 200;
  ctx.body = data;
};
