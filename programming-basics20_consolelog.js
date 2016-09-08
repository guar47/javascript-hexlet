const assert = require('assert');

const bigDivisor = (a, b) => {
  if (a === 0 || b === 0) {
    return "error, one of numbers equal 0";
  }
  let i = 0;
  if (a > b) {
    i = b;
  } else {
    i = a;
  }

  while (i <= a || i <= b) {
    if (a % i === 0 && b % i === 0) {
      return i;
    }
    i--;
  }
};

console.log(bigDivisor(70, 105));

assert.equal(bigDivisor(2, 2), 2);
assert.equal(bigDivisor(11, 2), 1);
assert.equal(bigDivisor(2, 3), 1);
assert.equal(bigDivisor(6, 3), 3);
assert.equal(bigDivisor(14, 21), 7);
assert.equal(bigDivisor(100, 10), 10);
assert.equal(bigDivisor(50, 20), 10);
