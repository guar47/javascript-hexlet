import { makePoint, getX, getY } from 'hexlet-points';

// BEGIN (write your solution here)
export const quadrant = (point) => {
  if (getX(point) > 0 && getY(point) > 0) {
    return 1;
  } else if (getX(point) < 0 && getY(point) > 0) {
    return 2;
  } else if (getX(point) < 0 && getY(point) < 0) {
    return 3;
  } else if (getX(point) > 0 && getY(point) < 0) {
    return 4;
  }
};
// END

// BEGIN (write your solution here)
export const symmetricalPoint = (point) => {
    point = makePoint(-getX(point), -getY(point));
  return point;
};
// END

// BEGIN (write your solution here)
export const distance = (point1, point2) => {
  var x1 = getX(point1);
  var x2 = getX(point2);
  var y1 = getY(point1);
  var y2 = getY(point2);
  var d = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
  return d;
};
// END
