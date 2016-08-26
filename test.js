const smallestDivisor = num => {
  const iter = acc => {
    if (num % acc === 0) {
      return acc;
    }
    if (acc >= num / 2) {
      return 1;
    }
    return iter(acc + 1);
  };
  return iter(2);
};

console.log(smallestDivisor(4));
