import { useState } from "react";
import { CompareContext } from "./CompareContext";

export const CompareProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const addMovie = (movie) => {
    if (!movie?.imdbID) return;

    setMovies((prev) => {
      if (prev.find((m) => m.imdbID === movie.imdbID)) return prev;
      if (prev.length >= 2) return prev;

      return [...prev, movie];
    });
  };

  const removeMovie = (id) => {
    setMovies((prev) => prev.filter((m) => m.imdbID !== id));
  };

  return (
    <CompareContext.Provider value={{ movies, addMovie, removeMovie }}>
      {children}
    </CompareContext.Provider>
  );
};
