import movieApi from "../api/movieApi";

export const getRecentComparisons = async () => {
  const response = await movieApi.get("/comparisons/recent");

  return response.data;
};
