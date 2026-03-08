export const imdbRegex = /^tt\d{7,8}$/;

export const isValidImdbId = (id) => imdbRegex.test(id);

