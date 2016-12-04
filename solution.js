const distance = (x, y) => {
  var d1 = Math.pow(x * 2 - x * 1, 2);
  var d2 = Math.pow(y * 2 - y * 1, 2);
  var d = Math.sqrt(d1 + d2);
  return d;
};

console.log(distance(-2, -3));
