import { cons, car, cdr } from 'hexlet-pairs';
import { l, isEmpty, head, tail, cons as consList } from 'hexlet-pairs-data';

// BEGIN (write your solution here)
export const make = () => l();
export const node = (tagName, body) => cons(tagName, body);
export const append = (list, element) => consList(element, list);

export const toString = (list) => {
  if(isEmpty(list)) {
    return '';
  } else {
    var firstPair = head(list);
    var curList = tail(list);
    return `${toString(curList)}<${car(firstPair)}>${cdr(firstPair)}</${car(firstPair)}>`;
  }
};
// END
