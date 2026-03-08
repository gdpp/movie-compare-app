import { jest } from "@jest/globals";

const mockGetMovieById = jest.fn();
const mockLogger = { info: jest.fn(), error: jest.fn() };

jest.unstable_mockModule("../../../src/services/omdb.movie.service.js", () => ({
  getMovieById: mockGetMovieById,
}));
jest.unstable_mockModule("../../../src/utils/logger.js", () => ({
  default: mockLogger,
}));

const { getMovie } = await import("../../../src/controllers/movie.controller.js");

describe("getMovie controller", () => {
  let ctx;

  beforeEach(() => {
    jest.clearAllMocks();
    ctx = {
      params: {},
      status: undefined,
      body: undefined,
      ip: "127.0.0.1",
      throw: jest.fn(),
    };
  });

  it("should return 400 for invalid imdbId format", async () => {
    ctx.params = { imdbId: "123" };

    await getMovie(ctx);

    expect(ctx.status).toBe(400);
    expect(ctx.body.error).toBe(
      "Invalid IMDb ID format. Must be 'tt' followed by 7-8 digits",
    );
    expect(mockGetMovieById).not.toHaveBeenCalled();
  });

  it("should return 400 for imdbId without tt", async () => {
    ctx.params = { imdbId: "0372784" };

    await getMovie(ctx);

    expect(ctx.status).toBe(400);
  });

  it("should return 404 when movie not found", async () => {
    ctx.params = { imdbId: "tt0000000" };
    mockGetMovieById.mockResolvedValue({ Response: "False", Error: "Movie not found!" });

    await getMovie(ctx);

    expect(ctx.status).toBe(404);
    expect(ctx.body.error).toBe("Movie not found!");
  });

  it("should return 200 with movie data", async () => {
    const movie = {
      Response: "True",
      Title: "Batman Begins",
      Year: "2005",
      imdbID: "tt0372784",
    };
    ctx.params = { imdbId: "tt0372784" };
    mockGetMovieById.mockResolvedValue(movie);

    await getMovie(ctx);

    expect(ctx.status).toBe(200);
    expect(ctx.body.Title).toBe("Batman Begins");
  });

  it("should normalize totalSeasons for series", async () => {
    const series = {
      Response: "True",
      Title: "Breaking Bad",
      Type: "series",
      totalSeasons: "5",
    };
    ctx.params = { imdbId: "tt0903747" };
    mockGetMovieById.mockResolvedValue(series);

    await getMovie(ctx);

    expect(ctx.body.totalSeasons).toBe(5);
  });

  it("should call ctx.throw on service error", async () => {
    ctx.params = { imdbId: "tt0372784" };
    mockGetMovieById.mockRejectedValue(new Error("Network error"));

    await getMovie(ctx);

    expect(ctx.throw).toHaveBeenCalledWith(500, "External service error", expect.any(Error));
  });
});
