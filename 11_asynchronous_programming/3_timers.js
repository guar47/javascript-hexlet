// BEGIN (write your solution here)
export default (coll, fn, callback) => {
  if (coll.length === 0) {
    callback([]);
    return;
  }
  const iter = ([head, ...rest], acc) => {
    const newAcc = fn(head) ? [...acc, head] : acc;
    if (rest.length === 0) {
      callback(newAcc);
      return;
    }
    setTimeout(iter, 0, rest, newAcc);
  };
  iter(coll, []);
};
// END
