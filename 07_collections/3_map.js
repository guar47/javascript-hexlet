// BEGIN (write your solution here)
const wordsCount = (words, stopWords) => {
  const lowered = words.map(word => word.toLowerCase());
  const filtered = lowered.filter(word => !stopWords.includes(word));
  const result = filtered.reduce((acc, word) => {
    if (acc.has(word)) {
      acc.set(word, acc.get(word) + 1);
    }
    if (!acc.has(word)) {
      acc.set(word, 1);
    }
    return acc;
  }, new Map());
  return result;
};
// END

const stopWords = ['and', 'or', 'a', 'the', ''];
const words = ['HellO', 'h', 'And', 'heLlo', '', 'AND', 'DOG', 'oR', 'cat', 'HELLO', 'caT'];
wordsCount(words, stopWords);
