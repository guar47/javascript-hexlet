// BEGIN (write your solution here)
export default (str) => {
  const result = [];
  let word = '';
  let state = 'newString';
  for (let i = 0; i < str.length; i += 1) {
    switch (state) {
      case 'newString':
        if (str[i] !== ' ' && str[i] !== '\n') {
          word += str[i];
          state = 'inFirstWord';
        }
        break;
      case 'inFirstWord':
        if (str[i] === ' ' || str[i] === '\n') {
          result.push(word);
          word = '';
          state = str[i] === '\n' ? 'newString' : 'afterFirstWord';
        } else {
          word += str[i];
        }
        break;
      case 'afterFirstWord':
        if (str[i] === '\n') {
          state = 'newString';
        }
        break;

      default:
    }
  }
  return result;
};
// END
