// BEGIN (write your solution here)
export const map = (func, elements) => {
  const iter = (cur, acc, func) => {
    if (isEmpty(cur)) {
      return reverse(acc);
    } else {
      return iter(tail(cur), cons(func(head(cur)), acc), func);
    }
  };
  return iter(elements, l(), func);
};

export const mirror = (elements) => {
  if (isEmpty(elements)) {
    return l();
  } else {
    let oldName = name(head(elements));
    let newValue = reverseStr(value(head(elements)));
    let newElement = node(oldName, newValue);
    return cons(newElement, mirror(tail(elements)));
  }
};
// END

export const b2p = (elements) => {
  if (isEmpty(elements)) {
    return l();
  }
  let newElement;
  const element = head(elements);
  if (is('blockquote', element)) {
    newElement = node('p', value(element));
  } else {
    newElement = element;
  }
  return cons(newElement, b2p(tail(elements)));
};
