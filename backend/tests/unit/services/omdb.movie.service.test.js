import { jest } from "@jest/globals";

const mockHttpGet = jest.fn();
const mockCacheGet = jest.fn();
const mockCacheSet = jest.fn();
const mockLogger = { info: jest.fn() };

jest.unstable_mockModule("../../../src/utils/httpClient.js", () => ({
  default: { get: mockHttpGet },
}));
jest.unstable_mockModule("../../../src/utils/cache.js", () => ({
  default: {
    get: mockCacheGet,
    set: mockCacheSet,
  },
}));
jest.unstable_mockModule("../../../src/utils/logger.js", () => ({
  default: mockLogger,
}));

const { getMovieById } = await import("../../../src/services/omdb.movie.service.js");

describe("omdb movie service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCacheGet.mockReturnValue(undefined);
  });

  it("should return cached result when cache hit", async () => {
    const cached = { Response: "True", Title: "Batman Begins", imdbID: "tt0372784" };
    mockCacheGet.mockReturnValue(cached);

    const result = await getMovieById("tt0372784");

    expect(result).toEqual(cached);
    expect(mockHttpGet).not.toHaveBeenCalled();
    expect(mockCacheSet).not.toHaveBeenCalled();
  });

  it("should call API with imdbId and full plot when cache miss", async () => {
    const apiResponse = {
      data: {
        Response: "True",
        Title: "Batman Begins",
        imdbID: "tt0372784",
        Plot: "Full plot...",
      },
    };
    mockHttpGet.mockResolvedValue(apiResponse);

    const result = await getMovieById("tt0372784");

    expect(mockHttpGet).toHaveBeenCalledWith("/", {
      params: expect.objectContaining({
        i: "tt0372784",
        plot: "full",
      }),
    });
    expect(mockCacheSet).toHaveBeenCalledWith("movie:tt0372784", apiResponse.data);
    expect(result).toEqual(apiResponse.data);
  });
});
