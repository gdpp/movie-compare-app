import { jest } from "@jest/globals";
import { buildComparison } from "../../../src/utils/comparisonUtils.js";

describe("comparisonUtils.buildComparison", () => {
  const movieA = {
    imdbID: "tt0372784",
    Title: "Batman Begins",
    imdbRating: "8.2",
    BoxOffice: "$205,343,774",
    Runtime: "140 min",
    Year: "2005",
    Metascore: "70",
    Genre: "Action, Crime, Drama",
    Director: "Christopher Nolan",
    Actors: "Christian Bale, Michael Caine",
  };

  const movieB = {
    imdbID: "tt0468569",
    Title: "The Dark Knight",
    imdbRating: "9.0",
    BoxOffice: "$534,858,444",
    Runtime: "152 min",
    Year: "2008",
    Metascore: "84",
    Genre: "Action, Crime, Drama",
    Director: "Christopher Nolan",
    Actors: "Christian Bale, Heath Ledger",
  };

  it("should build comparison with ratings (highest, lowest, average)", () => {
    const result = buildComparison([movieA, movieB]);

    expect(result.ratings).toBeDefined();
    expect(result.ratings.highest.imdbId).toBe("tt0468569");
    expect(result.ratings.highest.title).toBe("The Dark Knight");
    expect(result.ratings.highest.rating).toBe("9.0");

    expect(result.ratings.lowest.imdbId).toBe("tt0372784");
    expect(result.ratings.lowest.title).toBe("Batman Begins");
    expect(result.ratings.lowest.rating).toBe("8.2");

    expect(result.ratings.average).toBe("8.6");
    expect(result.ratings.distribution).toHaveLength(2);
  });

  it("should build comparison with box office data", () => {
    const result = buildComparison([movieA, movieB]);

    expect(result.boxOffice).toBeDefined();
    expect(result.boxOffice.highest.imdbId).toBe("tt0468569");
    expect(result.boxOffice.lowest.imdbId).toBe("tt0372784");
    expect(result.boxOffice.available).toBe(2);
    expect(result.boxOffice.total).toContain("740");
    expect(result.boxOffice.distribution).toHaveLength(2);
  });

  it("should build comparison with release years", () => {
    const result = buildComparison([movieA, movieB]);

    expect(result.releaseYears).toBeDefined();
    expect(result.releaseYears.oldest.year).toBe("2005");
    expect(result.releaseYears.newest.year).toBe("2008");
    expect(result.releaseYears.span).toBe("3 years");
    expect(result.releaseYears.timeline).toHaveLength(2);
  });

  it("should build comparison with runtime", () => {
    const result = buildComparison([movieA, movieB]);

    expect(result.runtime).toBeDefined();
    expect(result.runtime.longest.imdbId).toBe("tt0468569");
    expect(result.runtime.shortest.imdbId).toBe("tt0372784");
    expect(result.runtime.average).toContain("146");
  });

  it("should compute common actors and genres", () => {
    const result = buildComparison([movieA, movieB]);

    expect(result.commonActors).toContain("Christian Bale");
    expect(result.commonGenres).toBeDefined();
    expect(result.uniqueDirectors).toContain("Christopher Nolan");
  });

  it("should handle N/A and missing values", () => {
    const movieNoRating = {
      ...movieA,
      imdbID: "tt0000001",
      imdbRating: "N/A",
      BoxOffice: "N/A",
      Runtime: "N/A",
      Metascore: "N/A",
    };

    const result = buildComparison([movieNoRating, movieB]);

    expect(result.ratings.distribution).toHaveLength(1);
    expect(result.ratings.highest.imdbId).toBe("tt0468569");
  });

  it("should handle empty actors/genres", () => {
    const movieNoActors = {
      ...movieA,
      imdbID: "tt0000002",
      Actors: undefined,
      Genre: undefined,
      Director: undefined,
    };

    const result = buildComparison([movieNoActors, movieB]);
    expect(result.commonActors).toEqual([]);
    expect(result.uniqueDirectors).toBeDefined();
  });
});
