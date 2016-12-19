const cons = (a, b) => Math.pow(2, a) * Math.pow(3, b);

const car = (num) => {
  for (var i = 0; num % 2 === 0; i++) {
    num = num / 2;
  }
  return i;
}

const cdr = (num) => {
  for (var i = 0; num % 3 === 0; i++) {
    num = num / 3;
  }
  return i;
}

// we can declare other function of factorial and use it in cdr and car
console.log(car(cons(8, 5)));
