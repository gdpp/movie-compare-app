import { useCallback, useEffect, useRef, useState } from "react";
import { List, Skeleton } from "@mui/material";
import MovieResultItem from "../movies/MovieResultItem";

const SearchResultsList = ({
  movies,
  loading,
  query,
  error,
  onClose,
  onSelectMovie,
}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const listRef = useRef(null);
  const itemRefs = useRef([]);

  const count = movies?.length ?? 0;
  const focusedIndexClamped = count > 0 ? Math.min(focusedIndex, count - 1) : 0;

  useEffect(() => {
    itemRefs.current[focusedIndexClamped]?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [focusedIndexClamped]);

  useEffect(() => {
    if (count > 0) listRef.current?.focus();
  }, [count]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!count) return;
      if (e.key === "Escape") {
        onClose?.();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((i) => (Math.min(i, count - 1) + 1) % count);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((i) => (Math.min(i, count - 1) - 1 + count) % count);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const selected = movies[focusedIndexClamped];
        if (selected) onSelectMovie?.(selected);
        onClose?.();
      }
    },
    [count, focusedIndexClamped, onClose, onSelectMovie, movies],
  );

  if (!query?.trim()) return null;

  if (loading)
    return (
      <>
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </>
    );

  if (!movies?.length) return null;

  if (error) return null;

  return (
    <List
      ref={listRef}
      tabIndex={0}
      role="listbox"
      aria-activedescendant={
        movies[focusedIndex]
          ? `result-${movies[focusedIndex].imdbID}`
          : undefined
      }
      onKeyDown={handleKeyDown}
      sx={{
        py: 0,
        maxHeight: "inherit",
        overflow: "auto",
        outline: "none",
      }}
    >
      {movies.map((movie, index) => (
        <MovieResultItem
          key={movie.imdbID}
          movie={movie}
          id={`result-${movie.imdbID}`}
          isFocused={index === focusedIndexClamped}
          ref={(el) => (itemRefs.current[index] = el)}
          onSelect={onSelectMovie}
        />
      ))}
    </List>
  );
};

export default SearchResultsList;
