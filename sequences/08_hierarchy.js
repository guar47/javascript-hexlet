// Решение учителя, сам решить не смог

// BEGIN
export const select = (query, html) => {
  if (isEmpty(query)) {
    return html;
  }
  const newHtml = reduce((element, acc) => {
    if (is(head(query), element)) {
      const elements = isEmpty(tail(query)) ? l(element) : l();
      return append(hasChildren(element) ? children(element) : elements, acc);
    }
    if (hasChildren(element)) {
      return append(select(query, children(element)), acc);
    }
    return acc;
  }, l(), html);

  return select(tail(query), newHtml);
};
// END
