// Convert string type values into safe plain numbers.
// This function:
// Remove symbols, commas, "min", "years"
// If fails, return null
function safeNumber(value) {
  if (!value || value === "N/A") return null;

  const cleaned = value
    .replace(/[$,]/g, "")
    .replace(" min", "")
    .replace(" years", "");

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
    imdbID: movie.imdbID,
    title: movie.Title,
    rating: safeNumber(movie.imdbRating),
    ratingRaw: movie.imdbRating,
    boxOffice: safeNumber(movie.BoxOffice),
    boxOfficeRaw: movie.BoxOffice,
    runtime: safeNumber(movie.Runtime),
    runtimeRaw: movie.Runtime,
    year: safeNumber(movie.Year),
    yearRaw: movie.Year,
    metascore: safeNumber(movie.Metascore),
    metascoreRaw: movie.Metascore,
    actors: movie.Actors?.split(",").map((a) => a.trim()) || [],
    genres: movie.Genre?.split(",").map((g) => g.trim()) || [],
    directors: movie.Director?.split(",").map((d) => d.trim()) || [],
  }));

  // RATINGS
  const ratings = normalized.filter((m) => m.rating !== null);

  const highestRating = ratings.reduce((a, b) => (a.rating > b.rating ? a : b));
  const lowestRating = ratings.reduce((a, b) => (a.rating < b.rating ? a : b));

  const ratingAverage = average(ratings.map((m) => m.rating));

  const ratingsDistribution = ratings
    .sort((a, b) => b.rating - a.rating)
    .map((m) => ({
      imdbId: m.imdbID,
      rating: m.ratingRaw,
    }));

  // BOX OFFICE
  const boxOfficeMovies = normalized.filter((m) => m.boxOffice !== null);

  const highestBox = boxOfficeMovies.reduce((a, b) =>
    a.boxOffice > b.boxOffice ? a : b,
  );

  const lowestBox = boxOfficeMovies.reduce((a, b) =>
    a.boxOffice < b.boxOffice ? a : b,
  );

  const totalBox = boxOfficeMovies.reduce((a, b) => a + b.boxOffice, 0);

  const avgBox = boxOfficeMovies.length
    ? Math.round(totalBox / boxOfficeMovies.length)
    : null;

  const boxDistribution = boxOfficeMovies
    .sort((a, b) => b.boxOffice - a.boxOffice)
    .map((m) => ({
      imdbId: m.imdbID,
      amount: m.boxOfficeRaw,
    }));

  // YEARS
  const sortedYears = normalized
    .filter((m) => m.year !== null)
    .sort((a, b) => a.year - b.year);

  const oldest = sortedYears[0];
  const newest = sortedYears[sortedYears.length - 1];

  const timeline = sortedYears.map((m) => ({
    imdbId: m.imdbID,
    year: m.yearRaw,
  }));

  // RUNTIME
  const runtimes = normalized.filter((m) => m.runtime !== null);

  const longest = runtimes.reduce((a, b) => (a.runtime > b.runtime ? a : b));
  const shortest = runtimes.reduce((a, b) => (a.runtime < b.runtime ? a : b));

  const avgRuntime = average(runtimes.map((m) => m.runtime));

  const runtimeDistribution = runtimes
    .sort((a, b) => b.runtime - a.runtime)
    .map((m) => ({
      imdbId: m.imdbID,
      runtime: m.runtimeRaw,
    }));

  // METASCORE
  const metas = normalized.filter((m) => m.metascore !== null);
  const highestMeta = metas.reduce((a, b) =>
    a.metascore > b.metascore ? a : b,
  );

  const lowestMeta = metas.reduce((a, b) =>
    a.metascore < b.metascore ? a : b,
  );

  const avgMeta = average(metas.map((m) => m.metascore));

  // ACTORS / GENRES
  const actorsArray = normalized.map((m) => m.actors);
  const genresArray = normalized.map((m) => m.genres);
  const directorsArray = normalized.flatMap((m) => m.directors);

  const commonActors = intersection(actorsArray);

  const commonGenres = intersection(genresArray).map((genre) => ({
    genre,
    appearsIn: normalized
      .filter((m) => m.genres.includes(genre))
      .map((m) => m.imdbID),
    count: normalized.filter((m) => m.genres.includes(genre)).length,
  }));

  const uniqueDirectors = unique(directorsArray);

  // 2. Build final object
  return {
    ratings: {
      highest: {
        imdbId: highestRating.imdbID,
        title: highestRating.title,
        rating: highestRating.ratingRaw,
      },
      lowest: {
        imdbId: lowestRating.imdbID,
        title: lowestRating.title,
        rating: lowestRating.ratingRaw,
      },
      average: String(ratingAverage),
      range: String(highestRating.rating - lowestRating.rating),
      distribution: ratingsDistribution,
    },

    boxOffice: {
      highest: {
        imdbId: highestBox.imdbID,
        title: highestBox.title,
        amount: highestBox.boxOfficeRaw,
      },
      lowest: {
        imdbId: lowestBox.imdbID,
        title: lowestBox.title,
        amount: lowestBox.boxOfficeRaw,
      },
      total: `$${totalBox.toLocaleString()}`,
      average: `$${avgBox?.toLocaleString()}`,
      available: boxOfficeMovies.length,
      distribution: boxDistribution,
    },

    releaseYears: {
      oldest: {
        imdbId: oldest.imdbID,
        title: oldest.title,
        year: oldest.yearRaw,
      },
      newest: {
        imdbId: newest.imdbID,
        title: newest.title,
        year: newest.yearRaw,
      },
      span: `${newest.year - oldest.year} years`,
      timeline,
    },

    runtime: {
      longest: {
        imdbId: longest.imdbID,
        title: longest.title,
        runtime: longest.runtimeRaw,
      },
      shortest: {
        imdbId: shortest.imdbID,
        title: shortest.title,
        runtime: shortest.runtimeRaw,
      },
      average: `${Math.round(avgRuntime)} min`,
      distribution: runtimeDistribution,
    },

    metascore: {
      highest: {
        imdbId: highestMeta.imdbID,
        title: highestMeta.title,
        score: highestMeta.metascoreRaw,
      },
      lowest: {
        imdbId: lowestMeta.imdbID,
        title: lowestMeta.title,
        score: lowestMeta.metascoreRaw,
      },
      average: String(Math.round(avgMeta)),
      range: String(highestMeta.metascore - lowestMeta.metascore),
    },
    commonActors,
    commonGenres,
    uniqueDirectors,
  };
}
