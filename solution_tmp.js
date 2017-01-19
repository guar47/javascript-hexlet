const fromPairs = (pairArr) => {
  const result = {};
  for (let i = 0; i < pairArr.length; i += 1) {
    result[pairArr[i][0]] = pairArr[i][1];
  }
  return result;
};

console.log(fromPairs([
  ['fred', 30],
  ['barney', 40]
]));
// → { 'fred': 30, 'barney': 40 }
