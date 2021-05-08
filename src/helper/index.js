export const getComplementUrl = (query ='', continent = '') => {
  return query.length > 0
    ? `name/${query}`
    : continent.length > 0 && continent !== "select"
    ? `region/${continent}`
    : "all";
};
