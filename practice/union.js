// BEGIN (write your solution here)
export const union = (list1, list2) => {
  const join = reduce((element, acc) => cons(element, acc), list2, reverse(list1));
  return reverse(reduce((element, acc) => !has(acc, element) ? cons(element, acc) : acc, l(), join));
};


export default union;
// END
