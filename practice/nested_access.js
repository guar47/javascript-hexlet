const obj = {
  person: {
    name: 'joe',
    history: {
      hometown: 'bratislava',
      bio: {
        funFact: 'I like fishing.',
      },
    },
  },
};

Object.prototype.hash = function hash(path) {
  const fullPath = path.split('.');
  return fullPath.reduce((previousValue, currentItem) => previousValue && previousValue[currentItem], this);
};

console.log(obj.hash('person.history.bio'));
