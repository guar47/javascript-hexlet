
// BEGIN (write your solution here)
export const filter = (func, elements) => {
  const iter = (cur, acc) => {
    if (isEmpty(cur)) {
      return reverse(acc);
    }
    if (func(head(cur))) {
      return iter(tail(cur), cons(head(cur), acc));
    }
    return iter(tail(cur), acc);
  };
  return iter(elements, l());
};

export const quotes = (elements) => {
  if (isEmpty(elements)) {
    return l();
  }
  if (is('blockquote', head(elements))) {
    var quote = value(head(elements));
    return cons(quote, quotes(tail(elements)));
  } else {
    return quotes(tail(elements));
  }
};
// END

export const removeHeaders = (elements) => {
  if (isEmpty(elements)) {
    return l();
  }

  const element = head(elements);
  const tailElements = tail(elements);
  if (is('h1', element)) {
    return removeHeaders(tailElements);
  }
  return cons(element, removeHeaders(tailElements));
};
