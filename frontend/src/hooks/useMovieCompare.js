import { useState } from "react";
import { compareMovies } from "../services/compareService";

export const useMovieComparison = () => {
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);

  const runComparison = async (ids) => {
    if (!ids || ids.length < 2) return;

    setLoading(true);

    try {
      const data = await compareMovies(ids);

      setComparison(data.comparison);
    } finally {
      setLoading(false);
    }
  };

  return {
    comparison,
    loading,
    runComparison,
  };
};
