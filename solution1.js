// BEGIN (write your solution here)
const reverseInt = (num) => {
    let newNum = '';
    let offset = 0;

    if (String(num)[0] === '-') {
      offset = 1;
      newNum += '-';
    }
    for (let i = String(num).length - 1; i >= offset; i--)
      newNum += String(num)[i];

    return newNum;
  }
  // END

console.log(reverseInt(1234567890));
