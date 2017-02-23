function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
const generator = generateSequence();
const one = generator.next();

console.log(one);
