import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import CompareSection from "/src/components/comparison/CompareSection";
import { CompareProvider } from "/src/context/CompareProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the hooks and contexts
vi.mock("/src/context/CompareContext", () => ({
  CompareContext: {
    Provider: ({ children }) => children,
  },
  useCompare: () => ({
    movies: [],
    addMovie: vi.fn(),
    removeMovie: vi.fn(),
  }),
}));

vi.mock("/src/hooks/useMovieCompare", () => ({
  useMovieComparison: () => ({
    comparison: null,
    runComparison: vi.fn(),
  }),
}));

vi.mock("/src/components/comparison/AddMovieModal", () => ({
  default: function MockAddMovieModal({ open, onClose, onAddMovie }) {
    return open ? (
      <div data-testid="add-movie-modal">
        <button onClick={onClose}>Close</button>
        <button onClick={() => onAddMovie({ title: "Test Movie" })}>Add</button>
      </div>
    ) : null;
  },
}));

vi.mock("/src/components/comparison/MovieCarousel", () => ({
  default: function MockMovieCarousel({ onAddMovie }) {
    return (
      <div data-testid="movie-carousel">
        <button onClick={onAddMovie}>Add Movie</button>
      </div>
    );
  },
}));

vi.mock("/src/components/comparison/RatingChart", () => ({
  default: function MockRatingChart() {
    return <div data-testid="rating-chart">Chart</div>;
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <CompareProvider>{children}</CompareProvider>
    </QueryClientProvider>
  );
};

describe("CompareSection", () => {
  it("should render MovieCarousel and not RatingChart when no comparison", () => {
    render(<CompareSection />, { wrapper: createWrapper() });

    expect(screen.getByTestId("movie-carousel")).toBeInTheDocument();
    expect(screen.queryByTestId("rating-chart")).not.toBeInTheDocument();
  });

  it("should open modal when add movie button is clicked", () => {
    render(<CompareSection />, { wrapper: createWrapper() });

    const addButton = screen.getByText("Add Movie");
    fireEvent.click(addButton);

    expect(screen.getByTestId("add-movie-modal")).toBeInTheDocument();
  });

  it("should close modal when close button is clicked", () => {
    render(<CompareSection />, { wrapper: createWrapper() });

    const addButton = screen.getByText("Add Movie");
    fireEvent.click(addButton);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("add-movie-modal")).not.toBeInTheDocument();
  });
});
