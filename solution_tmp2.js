function removeSmallest(numbers) {
  const minOfNumbers = Math.min(...numbers);
  return numbers.indexOf(minOfNumbers);
  // return numbers.filter(num => !num === minOfNumbers);
}


console.log(removeSmallest([1, 2, 3, 4, 5, 1]));
