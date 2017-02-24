const test = [1, 2, 3]

const after = test.map(num => {
  if (num + 1 > 0) {
    return `test ${num}`;
  }
})

console.log(after);
