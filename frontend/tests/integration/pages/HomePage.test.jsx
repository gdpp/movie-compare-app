import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import HomePage from "/src/pages/HomePage";

vi.mock("/src/components/hero/HeroSection", () => ({
  default: function MockHeroSection() {
    return <div data-testid="hero-section">Hero Section</div>;
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe("HomePage", () => {
  it("should render HeroSection", () => {
    render(<HomePage />, { wrapper: createWrapper() });

    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
  });
});
