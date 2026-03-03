import { jest } from "@jest/globals";
import request from "supertest";

// Manual mock creation
const mockSearchMovies = jest.fn();

// Mock the module before import
jest.unstable_mockModule("../../src/services/omdb.service.js", () => ({
  searchMovies: mockSearchMovies,
}));

// Dynamic import after mock
const { default: app } = await import("../../src/main.js");

describe("GET /api/search", () => {
  beforeEach(() => {
    mockSearchMovies.mockReset();
  });

  it("should return 400 if s is missing", async () => {
    const res = await request(app.callback()).get("/api/search");

    expect(res.status).toBe(400);
    expect(res.body.Error).toBe("Search parameter 's' is required");
  });

  it("should return 404 if no results found", async () => {
    mockSearchMovies.mockResolvedValue({
      Response: "False",
      Error: "Movie not found!",
    });

    const res = await request(app.callback()).get("/api/search?s=abcdefg");

    expect(res.status).toBe(404);
    expect(res.body.Response).toBe("False");
  });

  it("should return 200 with results", async () => {
    mockSearchMovies.mockResolvedValue({
      Response: "True",
      Search: [
        {
          Title: "Batman Begins",
          Year: "2005",
          imdbID: "tt0372784",
        },
      ],
      totalResults: "1",
    });

    const res = await request(app.callback()).get("/api/search?s=batman");

    expect(res.status).toBe(200);
    expect(res.body.Response).toBe("True");
    expect(res.body.Search.length).toBeGreaterThan(0);
  });
});
