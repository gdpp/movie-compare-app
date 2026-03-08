import { jest } from "@jest/globals";

const mockSearchMovies = jest.fn();
const mockLogger = { info: jest.fn(), error: jest.fn() };

jest.unstable_mockModule("../../../src/services/omdb.search.service.js", () => ({
  searchMovies: mockSearchMovies,
}));
jest.unstable_mockModule("../../../src/utils/logger.js", () => ({
  default: mockLogger,
}));

const { search } = await import("../../../src/controllers/search.controller.js");

describe("search controller", () => {
  let ctx;

  beforeEach(() => {
    jest.clearAllMocks();
    ctx = {
      query: {},
      status: undefined,
      body: undefined,
      ip: "127.0.0.1",
    };
  });

  it("should return 400 when s is missing", async () => {
    ctx.query = {};

    await search(ctx);

    expect(ctx.status).toBe(400);
    expect(ctx.body).toEqual({
      Response: "False",
      Error: "Search parameter 's' is required",
    });
    expect(mockSearchMovies).not.toHaveBeenCalled();
  });

  it("should return 400 when page is less than 1", async () => {
    ctx.query = { s: "batman", page: -1 };

    await search(ctx);

    expect(ctx.status).toBe(400);
    expect(ctx.body.Error).toBe("Page must be greater than 0");
    expect(mockSearchMovies).not.toHaveBeenCalled();
  });

  it("should return 400 when page is 0", async () => {
    ctx.query = { s: "batman", page: 0 };

    await search(ctx);

    expect(ctx.status).toBe(400);
    expect(ctx.body.Error).toBe("Page must be greater than 0");
    expect(mockSearchMovies).not.toHaveBeenCalled();
  });

  it("should return 404 when no results", async () => {
    ctx.query = { s: "xyznonexistent" };
    mockSearchMovies.mockResolvedValue({ Response: "False", Error: "Movie not found!" });

    await search(ctx);

    expect(mockSearchMovies).toHaveBeenCalledWith({
      s: "xyznonexistent",
      type: undefined,
      y: undefined,
      page: undefined,
    });
    expect(ctx.status).toBe(404);
    expect(ctx.body.Response).toBe("False");
  });

  it("should return 200 with results", async () => {
    const data = {
      Response: "True",
      Search: [{ Title: "Batman", Year: "1989", imdbID: "tt0096895" }],
      totalResults: "1",
    };
    ctx.query = { s: "batman" };
    mockSearchMovies.mockResolvedValue(data);

    await search(ctx);

    expect(ctx.status).toBe(200);
    expect(ctx.body).toEqual(data);
    expect(mockLogger.info).toHaveBeenCalled();
  });
});
