const assert = require('assert');

const bigDivisor = (a, b) => {
  if (a === 0 || b === 0) {
    return 'error, one of numbers equal 0';
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
