const noop = (...args) => {};

const once = (fn) => {
  let called = false;

  return (...args) => {
    if (called) return;
    called = true;
    fn(...args);
  };
};

const filter = (coll, iteratee, callback = noop) => {
  const oncedCallback = once(callback);
  let completed = 0;
  const length = coll.length;
  if (length === 0) {
    callback(null, []);
  }
  const mappedColl = [];
  const iteratorCallback = (item, index, err, result) => {
    if (err) {
      oncedCallback(err);
      return;
    }
    if (result) {
      mappedColl[index] = item;
    }
    completed += 1;
    if (completed === length) {
      oncedCallback(err, mappedColl.filter(el => !!el));
    }
  };
  coll.forEach((item, index) => iteratee(item, iteratorCallback.bind(null, item, index)));
};

const coll = [1, 2, 3, 4, 5, 6, 7, 8];
filter(coll, (item, callback) => {
  callback(null, item % 2 === 0);
}, (err, result) => {
  console.log(result);
});
