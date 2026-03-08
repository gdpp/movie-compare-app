import { jest } from "@jest/globals";

const mockFindOne = jest.fn();
const mockCreate = jest.fn();
const mockFindAll = jest.fn();

const mockComparison = {
  findOne: mockFindOne,
  create: mockCreate,
  findAll: mockFindAll,
};

jest.unstable_mockModule("../../../src/models/index.js", () => ({
  default: {
    Comparison: mockComparison,
  },
}));

const {
  findComparisonByKey,
  createComparison,
  getRecentComparisons,
} = await import("../../../src/repositories/comparisonRepository.js");

describe("comparisonRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findComparisonByKey", () => {
    it("should call Comparison.findOne with comparisonKey", async () => {
      mockFindOne.mockResolvedValue(null);

      await findComparisonByKey("tt0372784-tt0468569");

      expect(mockFindOne).toHaveBeenCalledWith({
        where: { comparisonKey: "tt0372784-tt0468569" },
      });
    });

    it("should return found comparison", async () => {
      const row = { id: 1, comparisonKey: "tt0372784-tt0468569" };
      mockFindOne.mockResolvedValue(row);

      const result = await findComparisonByKey("tt0372784-tt0468569");

      expect(result).toEqual(row);
    });
  });

  describe("createComparison", () => {
    it("should call Comparison.create with correct payload", async () => {
      const payload = {
        imdbIds: ["tt0372784", "tt0468569"],
        titles: ["Batman Begins", "The Dark Knight"],
        comparisonKey: "tt0372784-tt0468569",
      };
      mockCreate.mockResolvedValue({ id: 1, ...payload });

      await createComparison(payload);

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          imdbIds: payload.imdbIds,
          titles: payload.titles,
          comparisonKey: payload.comparisonKey,
          movieCount: 2,
        }),
      );
    });
  });

  describe("getRecentComparisons", () => {
    it("should call findAll with order and limit", async () => {
      mockFindAll.mockResolvedValue([]);

      await getRecentComparisons();

      expect(mockFindAll).toHaveBeenCalledWith({
        order: [["comparedAt", "DESC"]],
        limit: 10,
        attributes: ["imdbIds", "titles", "movieCount", "comparedAt"],
      });
    });

    it("should return array of comparisons", async () => {
      const rows = [
        {
          imdbIds: ["tt0372784", "tt0468569"],
          titles: ["Batman Begins", "The Dark Knight"],
          movieCount: 2,
          comparedAt: new Date(),
        },
      ];
      mockFindAll.mockResolvedValue(rows);

      const result = await getRecentComparisons();

      expect(result).toEqual(rows);
    });
  });
});
