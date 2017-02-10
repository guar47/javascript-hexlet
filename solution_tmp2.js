const retry = (times, fn, callback) => {
  const next = (attempts) => {
    const cb = (err, args) => {
      if (!err || attempts === 0) {
        callback(err, args);
      } else {
        next(attempts - 1);
      }
    };
    fn(cb);
  };
  const attempts = times === 0 ? 4 : times - 1;
  next(attempts);
};


let calledTimes = 0;
retry(6, (callback) => {
  calledTimes++;
  if (calledTimes === 4) {
    callback(null, calledTimes);
    return;
  }
  callback(calledTimes);
}, (err, result) => {
  console.log(result, calledTimes);
});
