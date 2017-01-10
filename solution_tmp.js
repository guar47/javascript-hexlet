
// BEGIN (write your solution here)
const wordsCount = (words, stopWords) => {
  const wordsToLower = words.map(word => word.toLowerCase());
  const filtered = wordsToLower.filter(word => !stopWords.includes(word));
  console.log(filtered);
};
// END

const stopWords = ['and', 'or', 'a', 'the', ''];
const words = ['HellO', 'h', 'And', 'heLlo', '', 'AND', 'DOG', 'oR', 'cat', 'HELLO', 'caT'];
wordsCount(words, stopWords);
