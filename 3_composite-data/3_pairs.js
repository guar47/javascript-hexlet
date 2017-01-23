import { makePoint, getX, getY, toString } from 'hexlet-points';
import { cons, car, cdr } from 'hexlet-pairs';

// BEGIN (write your solution here)
export const makeSegment = (point1, point2) => cons(point1, point2);
export const startSegment = (segment) => car(segment);
export const endSegment = (segment) => cdr(segment);
export const toStr = (segment) => {
  return '[' + toString(startSegment(segment)) + ', ' + toString(endSegment(segment)) + "]";
};
export const midpointSegment = (segment) => {
  var x1 = getX(startSegment(segment));
  var x2 = getX(endSegment(segment));
  var y1 = getY(startSegment(segment));
  var y2 = getY(endSegment(segment));

  var x = (x1 + x2) / 2;
  var y = (y1 + y2) / 2;
  return makePoint(x, y);
};
// END
