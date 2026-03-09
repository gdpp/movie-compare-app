import { useEffect, useState } from "react";
import { getRecentComparisons } from "../services/comparisonsService";

export const useRecentComparisons = () => {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComparisons = async () => {
      try {
        const data = await getRecentComparisons();
        setComparisons(data?.data);
      } catch (error) {
        console.error("Failed to fetch recent comparisons", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComparisons();
  }, []);

  return { comparisons, loading };
};
