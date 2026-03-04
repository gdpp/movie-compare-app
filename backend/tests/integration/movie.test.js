import { jest } from "@jest/globals";
import request from "supertest";

const mockGetMovieById = jest.fn();

// Mock the module before import
jest.unstable_mockModule("../../src/services/omdb.movie.service.js", () => ({
  getMovieById: mockGetMovieById,
}));

// Dynamic import after mock
const { default: app } = await import("../../src/main.js");

describe("GET /api/movie/:imdbId", () => {
  beforeEach(() => {
    mockGetMovieById.mockReset();
  });

  it("should return 400 for invalid imdbId format", async () => {
    const res = await request(app.callback()).get("/api/movie/123");

    expect(res.status).toBe(400);
    expect(res.body.error).toBe(
      "Invalid IMDb ID format. Must be 'tt' followed by 7-8 digits",
    );
  });

  it("should return 404 if movie not found", async () => {
    mockGetMovieById.mockResolvedValue({
      Response: "False",
      Error: "Movie not found!",
    });

    const res = await request(app.callback()).get("/api/movie/tt0000000");

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Movie not found!");
  });

  it("should return 200 if movie exists", async () => {
    mockGetMovieById.mockResolvedValue({
      Response: "True",
      Title: "Batman Begins",
      Year: "2005",
      imdbID: "tt0372784",
    });

    const res = await request(app.callback()).get("/api/movie/tt0372784");

    expect(res.status).toBe(200);
    expect(res.body.Title).toBe("Batman Begins");
  });
});
