const noop = (...args) => {};
const once = (fn) => {
  let called = false;
  return (...args) => {
    if (called) return;
    called = true;
    fn(...args);
  };
};

const each = (coll, iteratee, callback = noop) => {
  const oncedCallback = once(callback);
  let completed = 0;
  if (coll.length === 0) {
    callback(null);
    return;
  }
  const cb = (err) => {
    completed++;
    if (err) {
      oncedCallback(err);
      return;
    }
    if (completed === coll.length) {
      oncedCallback(null);
    }
  };
  coll.forEach(item => iteratee(item, cb));
};
const filter = (coll, fn, callback) => {
  const result = [];
  each(coll, (item, cb) => {
    fn(item, (err, predicate) => {
      if (predicate) {
        result.push(item);
      }
      cb(err);
    });
  }, (err) => {
    callback(err, result);
  });
};
