import { jest } from "@jest/globals";

const mockGetRecentComparisons = jest.fn();

jest.unstable_mockModule("../../../src/repositories/comparisonRepository.js", () => ({
  getRecentComparisons: mockGetRecentComparisons,
}));

const { recentComparisons } = await import(
  "../../../src/controllers/comparisons.controller.js"
);

describe("recentComparisons controller", () => {
  let ctx;

  beforeEach(() => {
    jest.clearAllMocks();
    ctx = {
      status: undefined,
      body: undefined,
    };
  });

  it("should return 200 with empty message when no comparisons", async () => {
    mockGetRecentComparisons.mockResolvedValue([]);

    await recentComparisons(ctx);

    expect(ctx.status).toBe(200);
    expect(ctx.body.message).toContain("No property comparisons");
    expect(ctx.body.data).toEqual([]);
  });

  it("should return 200 with data when comparisons exist", async () => {
    const data = [
      {
        imdbIds: ["tt0372784", "tt0468569"],
        titles: ["Batman Begins", "The Dark Knight"],
        movieCount: 2,
        comparedAt: new Date(),
      },
    ];
    mockGetRecentComparisons.mockResolvedValue(data);

    await recentComparisons(ctx);

    expect(ctx.status).toBe(200);
    expect(ctx.body.message).toBe("Comparisons found");
    expect(ctx.body.data).toEqual(data);
  });
});
