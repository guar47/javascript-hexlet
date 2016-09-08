const son = (n, a, b) => {
  let result = 0;

  for (let i = 1; i < n; i++) {
    if (i % a === 0 || i % b === 0) {
      result += i;
    }
  }
  return result;
};

console.log(son(101, 7, 3));
