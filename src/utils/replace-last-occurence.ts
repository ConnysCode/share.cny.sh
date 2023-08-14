const replaceLastOccurrence = (
  input: string,
  query: string,
  replacement: string
) => {
  const regex = new RegExp(`(.*)(\\b${query}\\b)([^]*$)`);
  return input.replace(regex, (match, before, word, after) => {
    return before + replacement + after;
  });
};

export default replaceLastOccurrence;
