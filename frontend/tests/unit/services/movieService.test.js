import { vi } from "vitest";
import { searchMovies, getMovieById } from "/src/services/movieService";
import movieApi from "/src/api/movieApi";

// Mock the API
vi.mock("/src/api/movieApi", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("movieService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("searchMovies", () => {
    it("should return data when response is successful", async () => {
      const mockData = { Response: "True", Search: [{ Title: "Batman" }] };
      movieApi.get.mockResolvedValue({ data: mockData });

      const params = { s: "batman" };
      const result = await searchMovies({ queryKey: ["movie-search", params] });

      expect(movieApi.get).toHaveBeenCalledWith("/search", {
        params,
        signal: undefined,
      });
      expect(result).toEqual(mockData);
    });

    it("should throw error when response is false", async () => {
      const mockData = { Response: "False", Error: "Movie not found" };
      movieApi.get.mockResolvedValue({ data: mockData });

      const params = { s: "invalid" };
      await expect(
        searchMovies({ queryKey: ["movie-search", params] }),
      ).rejects.toThrow("Movie not found");
    });
  });

  describe("getMovieById", () => {
    it("should return movie data when successful", async () => {
      const mockData = { Response: "True", Title: "Batman" };
      movieApi.get.mockResolvedValue({ data: mockData });

      const imdbId = "tt0372784";
      const result = await getMovieById({ queryKey: ["movie", imdbId] });

      expect(movieApi.get).toHaveBeenCalledWith(`/movie/${imdbId}`, {
        signal: undefined,
      });
      expect(result).toEqual(mockData);
    });

    it("should throw error when movie not found", async () => {
      const mockData = { Response: "False", Error: "Movie not found" };
      movieApi.get.mockResolvedValue({ data: mockData });

      const imdbId = "invalid";
      await expect(
        getMovieById({ queryKey: ["movie", imdbId] }),
      ).rejects.toThrow("Movie not found");
    });
  });
});
