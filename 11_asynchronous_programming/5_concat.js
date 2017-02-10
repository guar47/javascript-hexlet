const noop = () => {};
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
    completed += 1;
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
const concat = (coll, fn, callback) => {
  let result = [];
  each(coll, (item, cb) => {
    fn(item, (err, y) => {
      result = result.concat(y || []);
      cb(err);
    });
  }, (err) => {
    callback(err, result);
  });
};
