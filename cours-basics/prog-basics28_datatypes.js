const length = str => str.length;

// BEGIN (write your solution here)
const sumDigits = (num) => {
  let result = 0;
  const string = String(num);
  for (let i = 0; i < length(string); i++) {
    const oneDig = Number(string[i]);
    result += oneDig;
  }
  return result;
};

const addDigits = (num) => {
  const count = length(String(num));
  let result = num;
  for (let i = count; i > 1; i = length(String(result))) {
    result = sumDigits(result);
  }
  return result;
};

// END

console.log(addDigits(1));
console.log(sumDigits(18));
console.log(sumDigits('18'));
console.log(sumDigits('123123'));
