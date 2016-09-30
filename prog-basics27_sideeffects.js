const length = str => str.length;
const toUpperCase = str => str.toUpperCase();

const firstChar = str => {
  let result = toUpperCase(str[0]);
  for (let i = 1; i < length(str); i++) {
    if (str[i - 1] === ' ') {
      result += toUpperCase(str[i]);
    } else {
      result += str[i];
    }
  }
  return result;
};

console.log(firstChar(' many different words inside sentence'));
