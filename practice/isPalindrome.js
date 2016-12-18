// сравниваем первый и последний символы строки
// если доходим до конца и длина строки < 1 => true
// если при сравнении ошибка => false

const isPalindrome = (str) => {
  if (str.length < 2) {
    return true;
} if (str[0] !== str[str.length - 1]) {
    return false
  }
  return isPalindrome(str.substr(1, str.length - 2));
};


console.log(isPalindrome('abbasf'));
