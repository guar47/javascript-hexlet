const retry = (attempts, func, callback) => {
  const next = (times) => {
    const cb = (err, result) => {
      if (!err || times === 0) {
        callback(err, result);
        return;
      } next(times - 1);
    };
    func(cb);
  };
  const times = attempts === 0 ? 4 : attempts - 1;
  next(times);
};

let calledTimes = 0;
retry(0, callback => {
  calledTimes++;
  callback(calledTimes);
}, (err, result) => {
  console.log(calledTimes);
});
