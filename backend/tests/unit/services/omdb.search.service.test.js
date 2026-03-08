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

const { searchMovies } = await import("../../../src/services/omdb.search.service.js");

describe("omdb search service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCacheGet.mockReturnValue(undefined);
  });

  it("should return cached result when cache hit", async () => {
    const cached = { Response: "True", Search: [] };
    mockCacheGet.mockReturnValue(cached);

    const result = await searchMovies({ s: "batman" });

    expect(result).toEqual(cached);
    expect(mockHttpGet).not.toHaveBeenCalled();
    expect(mockCacheSet).not.toHaveBeenCalled();
  });

  it("should call API and cache when cache miss", async () => {
    const apiResponse = {
      data: {
        Response: "True",
        Search: [{ Title: "Batman", imdbID: "tt0096895" }],
      },
    };
    mockHttpGet.mockResolvedValue(apiResponse);

    const result = await searchMovies({ s: "batman", page: 1 });

    expect(mockHttpGet).toHaveBeenCalledWith(
      "/",
      expect.objectContaining({
        params: expect.objectContaining({
          s: "batman",
          page: 1,
        }),
      }),
    );
    expect(mockCacheSet).toHaveBeenCalled();
    expect(result).toEqual(apiResponse.data);
  });
});
