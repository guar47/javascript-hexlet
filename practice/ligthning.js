export const zip = (list1, list2) => {
  if (isEmpty(list1) || isEmpty(list2)) {
    return l();
  }
  const elem1 = head(list1);
  const elem2 = head(list2);
  return cons(l(elem1, elem2), zip(tail(list1), tail(list2)));
};
