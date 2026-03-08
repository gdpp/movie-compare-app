import { jest } from "@jest/globals";
import request from "supertest";

const mockGetRecentComparisons = jest.fn();

jest.unstable_mockModule("../../src/repositories/comparisonRepository.js", () => ({
  getRecentComparisons: mockGetRecentComparisons,
  findComparisonByKey: jest.fn(),
  createComparison: jest.fn(),
}));

const { default: app } = await import("../../src/main.js");

describe("GET /api/comparisons/recent", () => {
  beforeEach(() => {
    mockGetRecentComparisons.mockReset();
  });

  it("should return 200 with empty data when no comparisons", async () => {
    mockGetRecentComparisons.mockResolvedValue([]);

    const res = await request(app.callback()).get("/api/comparisons/recent");

    expect(res.status).toBe(200);
    expect(res.body.message).toContain("No property comparisons");
    expect(res.body.data).toEqual([]);
  });

  it("should return 200 with comparisons list", async () => {
    const data = [
      {
        imdbIds: ["tt0372784", "tt0468569"],
        titles: ["Batman Begins", "The Dark Knight"],
        movieCount: 2,
        comparedAt: "2025-01-15T10:00:00.000Z",
      },
    ];
    mockGetRecentComparisons.mockResolvedValue(data);

    const res = await request(app.callback()).get("/api/comparisons/recent");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Comparisons found");
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].titles).toEqual(["Batman Begins", "The Dark Knight"]);
  });
});
