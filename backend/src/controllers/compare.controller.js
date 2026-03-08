import { getMovieById } from "../services/omdb.movie.service.js";
import { buildComparison } from "../utils/comparisonUtils.js";
import {
  createComparison,
  findComparisonByKey,
} from "../repositories/comparisonRepository.js";

const imdbRegex = /^tt\d{7,8}$/;

export async function compareMovies(ctx) {
  try {
    const { imdbIds } = ctx.request.body;

    // 400: Missing/empty array
    if (!imdbIds) {
      ctx.status = 400;
      ctx.body = { error: "imdbIds array is required" };
      return;
    }

    // 400: Not an array
    if (!Array.isArray(imdbIds)) {
      ctx.status = 400;
      ctx.body = { error: "imdbIds must be an array" };
      return;
    }

    // 400: Too few movies
    if (imdbIds.length < 2) {
      ctx.status = 400;
      ctx.body = { error: "At least 2 movies required for comparison" };
      return;
    }

    // 400: Too many movies
    if (imdbIds.length > 5) {
      ctx.status = 400;
      ctx.body = { error: "Maximum 5 movies can be compared at once" };
      return;
    }

    // 400: Invalid format
    const invalidIds = imdbIds.filter((id) => !imdbRegex.test(id));

    if (invalidIds.length > 0) {
      ctx.status = 400;
      ctx.body = { error: "All IMDb IDs must be valid format" };
      return;
    }

    // 400: Duplicate IDs
    const uniqueIds = new Set(imdbIds);
    const sortedIds = [...uniqueIds].sort();
    const comparisonKey = sortedIds.join("-");

    if (uniqueIds.size !== imdbIds.length) {
      ctx.status = 400;
      ctx.body = {
        error: "Duplicate IMDb IDs found. All movies must be unique",
      };
      return;
    }

    // Fetch movies
    const movies = [];
    const missing = [];

    for (const id of imdbIds) {
      const movie = await getMovieById(id);

      if (!movie || movie.Response === "False") {
        missing.push(id);
      } else {
        movies.push(movie);
      }
    }

    // 404: Movie(s) not found
    if (missing.length > 0) {
      ctx.status = 404;
      ctx.body = {
        error: "One or more movies not found",
        missing,
      };
      return;
    }

    // Build comparison
    const comparison = buildComparison(movies);
    const comparedAt = new Date();

    // Prepare data to store comparison
    const titles = movies.map((m) => m.Title);

    // Check if comparison already exists
    const existingComparison = await findComparisonByKey(comparisonKey);

    // Save comparison in DB
    // Save only if it doesn't exist
    if (!existingComparison) {
      await createComparison({
        imdbIds: sortedIds,
        titles,
        comparisonKey,
      });
    }

    ctx.status = 200;
    ctx.body = {
      movies: movies.map((m) => ({
        Title: m.Title,
        imdbID: m.imdbID,
        imdbRating: m.imdbRating,
        Year: m.Year,
        Runtime: m.Runtime,
        Genre: m.Genre,
        Metascore: m.Metascore,
        BoxOffice: m.BoxOffice,
      })),
      comparison,
      comparedAt,
      movieCount: movies.length,
    };
  } catch (error) {
    // 500: OMDb failure or unexpected error
    ctx.status = 500;
    ctx.body = {
      error: "Failed to fetch movie data",
    };
  }
}
