import { jest } from "@jest/globals";

const mockGetMovieById = jest.fn();
const mockBuildComparison = jest.fn();
const mockCreateComparison = jest.fn();
const mockFindComparisonByKey = jest.fn();
const mockLogger = { info: jest.fn(), error: jest.fn() };

jest.unstable_mockModule("../../../src/services/omdb.movie.service.js", () => ({
  getMovieById: mockGetMovieById,
}));
jest.unstable_mockModule("../../../src/utils/comparisonUtils.js", () => ({
  buildComparison: mockBuildComparison,
}));
jest.unstable_mockModule("../../../src/repositories/comparisonRepository.js", () => ({
  createComparison: mockCreateComparison,
  findComparisonByKey: mockFindComparisonByKey,
}));
jest.unstable_mockModule("../../../src/utils/logger.js", () => ({
  default: mockLogger,
}));

const { compareMovies } = await import("../../../src/controllers/compare.controller.js");

describe("compareMovies controller", () => {
  let ctx;

  const movieA = {
    Title: "Batman Begins",
    imdbID: "tt0372784",
    imdbRating: "8.2",
    Year: "2005",
    Runtime: "140 min",
    Genre: "Action",
    Metascore: "70",
    BoxOffice: "$205M",
  };
  const movieB = {
    Title: "The Dark Knight",
    imdbID: "tt0468569",
    imdbRating: "9.0",
    Year: "2008",
    Runtime: "152 min",
    Genre: "Action",
    Metascore: "84",
    BoxOffice: "$534M",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    ctx = {
      request: { body: {} },
      status: undefined,
      body: undefined,
      ip: "127.0.0.1",
    };
  });

  it("should return 400 when imdbIds is missing", async () => {
    ctx.request.body = {};

    await compareMovies(ctx);

    expect(ctx.status).toBe(400);
    expect(ctx.body.error).toBe("imdbIds array is required");
  });

  it("should return 400 when imdbIds is not an array", async () => {
    ctx.request.body = { imdbIds: "tt0372784,tt0468569" };

    await compareMovies(ctx);

    expect(ctx.status).toBe(400);
    expect(ctx.body.error).toBe("imdbIds must be an array");
  });

  it("should return 400 when fewer than 2 movies", async () => {
    ctx.request.body = { imdbIds: ["tt0372784"] };

    await compareMovies(ctx);

    expect(ctx.status).toBe(400);
    expect(ctx.body.error).toBe("At least 2 movies required for comparison");
  });

  it("should return 400 when more than 5 movies", async () => {
    ctx.request.body = {
      imdbIds: ["tt1", "tt2", "tt3", "tt4", "tt5", "tt6"].map((s) => s + "000000"),
    };

    await compareMovies(ctx);

    expect(ctx.status).toBe(400);
    expect(ctx.body.error).toBe("Maximum 5 movies can be compared at once");
  });

  it("should return 400 for invalid IMDb ID format", async () => {
    ctx.request.body = { imdbIds: ["tt0372784", "invalid"] };

    await compareMovies(ctx);

    expect(ctx.status).toBe(400);
    expect(ctx.body.error).toBe("All IMDb IDs must be valid format");
  });

  it("should return 400 for duplicate IMDb IDs", async () => {
    ctx.request.body = { imdbIds: ["tt0372784", "tt0468569", "tt0372784"] };

    await compareMovies(ctx);

    expect(ctx.status).toBe(400);
    expect(ctx.body.error).toContain("Duplicate");
  });

  it("should return 404 when one movie not found", async () => {
    ctx.request.body = { imdbIds: ["tt0372784", "tt9999999"] };
    mockGetMovieById
      .mockResolvedValueOnce(movieA)
      .mockResolvedValueOnce({ Response: "False" });

    await compareMovies(ctx);

    expect(ctx.status).toBe(404);
    expect(ctx.body.missing).toContain("tt9999999");
  });

  it("should return 200 with comparison and call createComparison when new", async () => {
    const comparisonResult = { ratings: {}, boxOffice: {} };
    ctx.request.body = { imdbIds: ["tt0372784", "tt0468569"] };
    mockGetMovieById.mockResolvedValueOnce(movieA).mockResolvedValueOnce(movieB);
    mockBuildComparison.mockReturnValue(comparisonResult);
    mockFindComparisonByKey.mockResolvedValue(null);

    await compareMovies(ctx);

    expect(ctx.status).toBe(200);
    expect(ctx.body.comparison).toEqual(comparisonResult);
    expect(ctx.body.movieCount).toBe(2);
    expect(mockCreateComparison).toHaveBeenCalledWith(
      expect.objectContaining({
        imdbIds: expect.any(Array),
        titles: expect.any(Array),
        comparisonKey: expect.any(String),
      }),
    );
  });

  it("should not call createComparison when comparison already exists", async () => {
    ctx.request.body = { imdbIds: ["tt0372784", "tt0468569"] };
    mockGetMovieById.mockResolvedValueOnce(movieA).mockResolvedValueOnce(movieB);
    mockBuildComparison.mockReturnValue({});
    mockFindComparisonByKey.mockResolvedValue({ id: 1 });

    await compareMovies(ctx);

    expect(ctx.status).toBe(200);
    expect(mockCreateComparison).not.toHaveBeenCalled();
  });

  it("should return 500 on unexpected error", async () => {
    ctx.request.body = { imdbIds: ["tt0372784", "tt0468569"] };
    mockGetMovieById.mockRejectedValue(new Error("Network error"));

    await compareMovies(ctx);

    expect(ctx.status).toBe(500);
    expect(ctx.body.error).toBe("Failed to fetch movie data");
  });
});
