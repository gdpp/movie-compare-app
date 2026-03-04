// Convert string type values into safe plain numbers.
// This function:
// Remove symbols, commas, "min"
// If fails, return null
function safeNumber(value) {
  if (!value || value === "N/A") return null;

  const cleaned = value.replace(/[$,]/g, "").replace(" min", "");
  const num = Number(cleaned);

  return isNaN(num) ? null : num;
}

// Calculate the average of an array.
// ignore null values
function average(arr) {
  const valid = arr.filter((num) => num !== null);
  if (!valid.length) return null;

  return Number((valid.reduce((x, y) => x + y, 0) / valid.length).toFixed(2));
}

// Finds the min and max value in array.
function getMinMax(arr) {
  const valid = arr.filter((num) => num !== null);
  if (!valid.length) return { min: null, max: null };

  return {
    min: Math.min(...valid),
    max: Math.max(...valid),
  };
}

// Finds common elements between multiple arrays.
function intersection(arrays) {
  return arrays.reduce((a, b) => a.filter((c) => b.includes(c)));
}

// Remove duplicates
// Set does not allow duplicat values
function unique(arr) {
  return [...new Set(arr)];
}

// Main function
export function buildComparison(movies) {
  // 1. Normalize data
  const normalized = movies.map((movie) => ({
    title: movie.Title,
    rating: safeNumber(movie.imdbRating),
    boxOffice: safeNumber(movie.BoxOffice),
    runtime: safeNumber(movie.Runtime),
    year: safeNumber(movie.Year),
    metascore: safeNumber(movie.Metascore),
    totalSeasons:
      movie.Type === "series" ? safeNumber(movie.totalSeasons) : null,
    actors: movie.Actors?.split(",").map((a) => a.trim()) || [],
    genres: movie.Genre?.split(",").map((g) => g.trim()) || [],
    directors: movie.Director?.split(",").map((d) => d.trim()) || [],
  }));

  // 2. Extract metrics
  const ratings = normalized.map((m) => m.rating);
  const boxOffice = normalized.map((m) => m.boxOffice);
  const runtime = normalized.map((m) => m.runtime);
  const years = normalized.map((m) => m.year);
  const metascores = normalized.map((m) => m.metascore);
  const seasons = normalized.map((m) => m.totalSeasons);
  const actorsArray = normalized.map((m) => m.actors);
  const genresArray = normalized.map((m) => m.genres);
  const directorsArray = normalized.flatMap((m) => m.directors);

  // 3. Build final object
  const result = {
    ratings: {
      ...getMinMax(ratings),
      average: average(ratings),
    },
    boxOffice: {
      ...getMinMax(boxOffice),
      total: boxOffice.filter(Boolean).reduce((a, b) => a + b, 0),
      average: average(boxOffice),
    },
    runtime: {
      ...getMinMax(runtime),
      average: average(runtime),
    },
    years: {
      ...getMinMax(years),
      span:
        getMinMax(years).max && getMinMax(years).min
          ? getMinMax(years).max - getMinMax(years).min
          : null,
    },
    metascore: {
      ...getMinMax(metascores),
      average: average(metascores),
    },
    commonActors: intersection(actorsArray),
    commonGenres: intersection(genresArray),
    uniqueDirectors: unique(directorsArray),
  };

  // Add only if exists type serie
  const hasSeries = seasons.some((s) => s !== null);

  if (hasSeries) {
    result.totalSeasons = seasons;
  }

  return result;
}
