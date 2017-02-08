const waterfall = (functions, callback) => {
  if (functions.length === 0) {
    callback();
  }
  const next = ([head, ...rest], previousResult) => {
    const cb = (err, ...args) => {
      if (rest.length === 0) {
        callback(err, args);
      } else {
        next(rest, args);
      }
    };
    head(...previousResult, cb);
  };
  next(functions, []);
};

const functions = [
  cb => cb(null),
  cb => cb(null, 'one'),
  (r1, cb) => cb(null, r1, 'two'),
  (r1, r2, cb) => cb(null, r2, r1),
];

waterfall(functions, (err, result) => {
  console.log(result[0] === 'two');
  console.log(result[1] === 'one');
});
