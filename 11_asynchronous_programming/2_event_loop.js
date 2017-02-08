import fs from 'fs';

const compare = (data1, data2) => {
  const lines1 = data1.split('\n').slice(0, -1);
  const lines2 = data2.split('\n').slice(0, -1);

  // BEGIN (write your solution here)
  const biggestArray = lines1.length > lines2.length ? lines1.length : lines2.length;
  const result = [];
  for (let i = 0; i < biggestArray; i += 1) {
    if (lines1[i] !== lines2[i]) {
      result.push([lines1[i], lines2[i]]);
    }
  }
  return result;
  // END
};

// BEGIN (write your solution here)
export default (path1, path2, callback) => {
  fs.readFile(path1, 'utf8', (err1, data1) => {
    if (!err1) {
      fs.readFile(path2, 'utf8', (err2, data2) => {
        if (!err2) {
          const result = compare(data1, data2);
          callback(null, result);
        }
      });
    }
  });
};
// END
