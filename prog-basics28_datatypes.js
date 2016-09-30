const length = str => str.length;

// BEGIN (write your solution here)
const sumDigits = num => {
  let result = 0;
  let string = String(num);
  for (var i = 0; i < length(string); i++) {
    let oneDig = Number(string[i]);
    result += oneDig;
  }
  return result;
};

const addDigits = num => {
  let count = length(String(num));
  let result = num;
  for (var i = count; i > 1; i = length(String(result))) {
    result = sumDigits(result);
  }
  return result;
};

// END

console.log(addDigits(1));
console.log(sumDigits(18));
console.log(sumDigits('18'));
console.log(sumDigits('123123'));
