const length = str => str.length;
const toUpperCase = str => str.toUpperCase();

const bigLettersCount = (str) => {
  // BEGIN (write your solution here)
  let count = 0;
  for (let i = 0; i < length(str); i++) {
    if (toUpperCase(str[i]) === str[i] || str[i] === ' ') {
      count++;
    }
    //    console.log(i, count);
  }
  return count;
  // END
};

const compare = (first, second) => {
  const firstCount = bigLettersCount(first);
  const secondCount = bigLettersCount(second);
  //  console.log(firstCount, secondCount);
  // BEGIN (write your solution here)
  if (firstCount > secondCount) {
    return 1;
  } else if (firstCount < secondCount) {
    return -1;
  }
  return 0;
  // END
};

const greaterThan = (first, second) => compare(first, second) === 1;


const lessThan = (first, second) => compare(first, second) === -1;

// END

console.log(greaterThan('ASDF', 'QWER'));
console.log(lessThan('ASDF', 'QWER'));
