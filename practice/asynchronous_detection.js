const noop = () => {};
const once = (fn) => {
  let called = false;
  return (...args) => {
    if (called) return;
    called = true;
    fn(...args);
  };
};
const detect = (coll, iteratee, callback = noop) => {
  const oncedCallback = once(callback);
  let completed = 0;
  if (coll.length === 0) {
    callback(null);
    return;
  }
  const cb = (err, item) => {
    completed += 1;
    if (!err || completed === coll.length) {
      oncedCallback(err, item);
    }
  };
  coll.forEach(item => iteratee(item, cb));
};
