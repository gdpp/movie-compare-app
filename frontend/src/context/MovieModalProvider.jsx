import { useState } from "react";
import { MovieModalContext } from "./MovieModalContext";

export function MovieModalProvider({ children }) {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const open = (imdbId) => setSelectedMovieId(imdbId);
  const close = () => setSelectedMovieId(null);

  return (
    <MovieModalContext.Provider value={{ selectedMovieId, open, close }}>
      {children}
    </MovieModalContext.Provider>
  );
}
