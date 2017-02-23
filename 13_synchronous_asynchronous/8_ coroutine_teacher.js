import 'babel-polyfill';

// BEGIN (write your solution here)
export default generator => {
  const iterator = generator();

  const next = result => {
    const value = Promise.resolve(result.value);
    if (result.done) {
      return value;
    }

    return value.then(
      res => next(iterator.next(res)),
      err => next(iterator.throw(err))
    );
  };

  try {
    return next(iterator.next());
  } catch (err) {
    return Promise.reject(err);
  }
};
// END
