import { useContext } from "react";
import { MovieModalContext } from "../context/MovieModalContext";

export function useMovieModal() {
  const ctx = useContext(MovieModalContext);
  if (!ctx) throw new Error("useMovieModal must be used within MovieModalProvider");
  return ctx;
}
