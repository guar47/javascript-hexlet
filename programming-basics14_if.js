const check = (a, b, c, d) => {
  if (a === c && b === d) {
    return 2;
  } else if ((a > b && c > d) || (a < b && c < d) || (a === b && c === d)) {
    return 1;
  } else {
    return 0;
  }
};

console.log(check(4, 3, 0, 0));
