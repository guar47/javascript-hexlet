const reverseString = (str) => {
    console.log(str);
  if (str.length <= 1) {
    return str;
  }
  return reverseString(str.substr(1, str.length - 1)) + str[0];
};

console.log(reverseString('abc'));

// return reverseString(1, 2) + a;
// return reverseString(1, 1) + b;
// return c;
