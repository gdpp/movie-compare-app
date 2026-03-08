import { jest } from "@jest/globals";
import request from "supertest";

const mockGetMovieById = jest.fn();
const mockBuildComparison = jest.fn();
const mockCreateComparison = jest.fn();
const mockFindComparisonByKey = jest.fn();

jest.unstable_mockModule("../../src/services/omdb.movie.service.js", () => ({
  getMovieById: mockGetMovieById,
}));
jest.unstable_mockModule("../../src/utils/comparisonUtils.js", () => ({
  buildComparison: mockBuildComparison,
}));
jest.unstable_mockModule("../../src/repositories/comparisonRepository.js", () => ({
  createComparison: mockCreateComparison,
  findComparisonByKey: mockFindComparisonByKey,
  getRecentComparisons: jest.fn(),
}));

const { default: app } = await import("../../src/main.js");

describe("POST /api/compare", () => {
  const movieA = {
    Title: "Batman Begins",
    imdbID: "tt0372784",
    imdbRating: "8.2",
    Year: "2005",
    Runtime: "140 min",
    Genre: "Action",
    Metascore: "70",
    BoxOffice: "$205,000,000",
  };
  const movieB = {
    Title: "The Dark Knight",
    imdbID: "tt0468569",
    imdbRating: "9.0",
    Year: "2008",
    Runtime: "152 min",
    Genre: "Action",
    Metascore: "84",
    BoxOffice: "$534,000,000",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFindComparisonByKey.mockResolvedValue(null);
  });

  it("should return 400 when body is empty", async () => {
    const res = await request(app.callback())
      .post("/api/compare")
      .send({})
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("imdbIds array is required");
  });

  it("should return 400 when imdbIds is not an array", async () => {
    const res = await request(app.callback())
      .post("/api/compare")
      .send({ imdbIds: "tt0372784" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("imdbIds must be an array");
  });

  it("should return 400 when less than 2 ids", async () => {
    const res = await request(app.callback())
      .post("/api/compare")
      .send({ imdbIds: ["tt0372784"] })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("At least 2 movies required for comparison");
  });

  it("should return 400 for invalid IMDb ID format", async () => {
    const res = await request(app.callback())
      .post("/api/compare")
      .send({ imdbIds: ["tt0372784", "invalid-id"] })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("All IMDb IDs must be valid format");
  });

  it("should return 200 with comparison when valid", async () => {
    mockGetMovieById
      .mockResolvedValueOnce(movieA)
      .mockResolvedValueOnce(movieB);
    mockBuildComparison.mockReturnValue({
      ratings: { highest: {}, lowest: {}, average: "8.6" },
      boxOffice: {},
      releaseYears: {},
      runtime: {},
      metascore: {},
      commonActors: [],
      commonGenres: [],
      uniqueDirectors: [],
    });

    const res = await request(app.callback())
      .post("/api/compare")
      .send({ imdbIds: ["tt0372784", "tt0468569"] })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.movies).toHaveLength(2);
    expect(res.body.comparison).toBeDefined();
    expect(res.body.movieCount).toBe(2);
  });

  it("should return 404 when one movie not found", async () => {
    mockGetMovieById
      .mockResolvedValueOnce(movieA)
      .mockResolvedValueOnce({ Response: "False" });

    const res = await request(app.callback())
      .post("/api/compare")
      .send({ imdbIds: ["tt0372784", "tt9999999"] })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(404);
    expect(res.body.missing).toContain("tt9999999");
  });
});
