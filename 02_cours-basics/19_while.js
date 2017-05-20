const smallestDivisor = (num) => {
  let div = 2;

  while (num / 2 >= div) {
    if (num % div === 0) {
      return div;
    }
    div += div;
  }
  return 1;
};


console.log(smallestDivisor(4));
