import db from "../models/index.js";

const { Comparison } = db;

export const findComparisonByKey = async (comparisonKey) => {
  return Comparison.findOne({
    where: {
      comparisonKey,
    },
  });
};

export const createComparison = async ({ imdbIds, titles, comparisonKey }) => {
  return Comparison.create({
    imdbIds,
    titles,
    comparisonKey,
    movieCount: imdbIds.length,
    comparedAt: new Date(),
  });
};

export const getRecentComparisons = async () => {
  return Comparison.findAll({
    order: [["comparedAt", "DESC"]],
    limit: 10,
    attributes: ["imdbIds", "titles", "movieCount", "comparedAt"],
  });
};
