import { getRecentComparisons } from "../repositories/comparisonRepository.js";

export const recentComparisons = async (ctx) => {
  const comparisons = await getRecentComparisons();

  ctx.status = 200;

  if (!comparisons.length) {
    ctx.body = {
      message:
        "No property comparisons available yet. Start comparing properties to see results here.",
      data: [],
    };
    return;
  }

  ctx.body = {
    message: "Comparisons found",
    data: comparisons,
  };
};
