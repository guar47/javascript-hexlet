// BEGIN (write your solution here)
export const reduce = (func, acc, elements) => {
  if (isEmpty(elements)) {
    return acc;
  } else {
    const item = head(elements);
    const newAcc = func(item, acc);
    return reduce(func, newAcc, tail(elements));
  }
};

export const emptyTagsCount = (tag, elements) => {
  const filterbyTagItems = filter(element => is(tag, element), elements);
  return reduce(((element, acc) => {
    return (value(element) === '') ? acc + 1 : acc;
  }), 0, filterbyTagItems);
};
// END

export const headersCount = (tagName, elements) => {
  const iter = (items, acc) => {
    if (isEmpty(items)) {
      return acc;
    }

    const item = head(items);
    const newAcc = is(tagName, item) ? acc + 1 : acc;
    return iter(tail(items), newAcc);
  };
  return iter(elements, 0);
};
