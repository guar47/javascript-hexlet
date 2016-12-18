const cons = (x, y) => (m) => m(x, y);


const car = (pair) => {
  return pair((x, y) => {
    return x;
  });
};
const cdr = (pair) => {
  return pair((x, y) => {
    return y;
  });
};

//---------------------------------------------------

 const make = (numer, denom) => cons(numer, denom);
 const numer = (rational) => car(rational);
 const denom = (rational) => cdr(rational);
 const toString = (rational) => {
  return String(numer(rational)) + ' / ' + String(denom(rational));
};
 const isEqual = (rat1, rat2) => {
  if (numer(rat1) * denom(rat2) === numer(rat2) * denom(rat1)) {
    return true;
  }
};
 const add = (rat1, rat2) => {
  var n = (numer(rat1) * denom(rat2) + denom(rat1) * numer(rat2));
  var d = denom(rat1) * denom(rat2);
  make(n, d);
};
 const sub = (rat1, rat2) => {
  return (numer(rat1) * denom(rat2) - denom(rat1) * numer(rat2)) / denom(rat1) * denom(rat2);
};
const mul = (rat1, rat2) => {
  return numer(rat1) * numer(rat2) / denom(rat1) * denom(rat2);
};
const div = (rat1, rat2) => {
  return numer(rat1) * denom(rat2) / denom(rat1) * numer(rat2);
};

const rat1 = make(2, 3);
const rat12 = make(4, 6);
const rat2 = make(7, 2);

 console.log(add(rat1, rat2));
