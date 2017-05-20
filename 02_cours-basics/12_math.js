// BEGIN (write your solution here)
const deg2rad = deg => (deg * Math.PI) / 180;

const area = (side, angle1, angle2) => {
  const sin1 = Math.sin(deg2rad(angle1));
  const sin2 = Math.sin(deg2rad(angle2));
  const sin3 = Math.sin(deg2rad(180 - (angle1 + angle2)));
  console.debug(sin1, sin2, sin3);
  return (((side * side) / 2) * (sin1 * sin2)) / sin3;
};

// END

console.log(area(3, 60, 60));
