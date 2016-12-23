// BEGIN (write your solution here)
export const has = (list, value) => {
  if (isEmpty(list)) {
    return false;
  }
  if (head(list) === value) {
    return true;
  }
  return has(tail(list), value);
};

export const reverse = (list) => {
  const iter = (current, acc) => {
    if (isEmpty(current)) {
      return acc;
    } else {
      return iter(tail(current), cons(head(current), acc));
    }
  };
  return iter(list, l());
};

export const append = (list1, list2) => {
    if (isEmpty(list1)) {
      return list2;
    } else {
      return cons(head(list1), append(tail(list1), list2));
    }
};
// END
