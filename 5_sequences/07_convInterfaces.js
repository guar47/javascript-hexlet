
// BEGIN (write your solution here)
export const extractHeaders = (elements) => {
  const filteredHeaders = filter(element => is('h2', element), elements);
  return map(element => node('p', value(element)), filteredHeaders);
};

export const wordsCount = (tag, word, elements) => {
  const filteredByTag = filter(element => is(tag, element), elements);
  return reduce((element, acc) => acc += wc(word, value(element)), 0, filteredByTag);
};
// END
