const magic = (...numbers) => {
  const sum = numbers.reduce((acc, number) => number + acc, 0);
  const inner = (...args) => {
    const summator = Number(inner);
    inner.valueOf = () => args.reduce((acc, number) => number + acc, summator);
    return inner;
  };
  inner.valueOf = () => sum;
  return inner;
};

console.log(magic(1, 2)(3, 4, 5)(1));
