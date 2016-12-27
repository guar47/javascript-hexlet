export const flatten = (list) => {
  const iter = (list, acc) => {
    return reduce((element, acc) => !isList(element) ? cons(element, acc) : iter(element, acc), acc, reverse(list));
  };
  return iter(list, l());
};
