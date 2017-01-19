class Enumerable {
  constructor(collection, operations) {
    this.collection = collection;
    this.operations = operations || [];
  }

  build(fn) {
    const newOperations = this.operations.slice();
    newOperations.push(fn);
    return new Enumerable(this.collection.slice(), newOperations);
  }

  // BEGIN (write your solution here)
  where(...predicates) {
    return this.build(coll =>
      predicates.reduce((acc, predicate) => {
        if (typeof predicate === 'function') {
          return acc.filter(predicate);
        }
        return acc.filter((element) => {
          const keys = Object.keys(predicate);
          return keys.every(key => predicate[key] === element[key]);
        });
      }, coll),
    );
  }
  // END

  get length() {
    return this.toArray().length;
  }

  toArray() {
    if (!this.memo) {
      this.memo = this.operations.reduce((acc, func) => func(acc), this.collection);
    }

    return this.memo;
  }
}
