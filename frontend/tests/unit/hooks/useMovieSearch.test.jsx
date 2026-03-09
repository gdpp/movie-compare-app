import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import useMovieSearch from "/src/hooks/useMovieSearch";
import { searchMovies } from "/src/services/movieService";

// Mock the service
vi.mock("/src/services/movieService", () => ({
  searchMovies: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useMovieSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not fetch when search string is less than 3 characters", () => {
    searchMovies.mockResolvedValue([]);

    const { result } = renderHook(() => useMovieSearch({ s: "ab" }), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
    expect(searchMovies).not.toHaveBeenCalled();
  });

  it("should fetch when search string is 3 or more characters", async () => {
    const mockData = [{ title: "Batman" }];
    searchMovies.mockResolvedValue(mockData);

    const { result } = renderHook(() => useMovieSearch({ s: "bat" }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(searchMovies).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["movie-search", { s: "bat" }],
      }),
    );
    expect(result.current.data).toEqual(mockData);
  });
});
