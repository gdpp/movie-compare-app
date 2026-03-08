import { TextField } from "@mui/material";
import debounce from "lodash.debounce";
import { useMemo } from "react";

const MovieSearchInput = ({ onSearch, onFocus }) => {
  const debouncedSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);

  const handleChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <TextField
      fullWidth
      label="Search movies..."
      onChange={handleChange}
      onFocus={onFocus}
    />
  );
};

export default MovieSearchInput;
