import { getRecentComparisons } from "../repositories/comparisonRepository.js";

export const recentComparisons = async (ctx) => {
  const comparisons = await getRecentComparisons();

  ctx.status = 200;

  if (!comparisons.length) {
    ctx.body = {
      Response: "False",
      Error:
        "No movies comparisons available yet. Start comparing movies to see results here.",
      data: [],
    };
    return;
  }

  ctx.body = {
    Response: "True",
    message: "Comparisons found",
    data: comparisons,
  };
};
