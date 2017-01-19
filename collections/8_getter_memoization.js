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

  select(fn) {
    return this.build(coll => coll.map(fn));
  }

  orderBy(fn, direction = 'asc') {
    const comparator = (a, b) => {
      const a1 = fn(a);
      const b1 = fn(b);
      const compareResult = direction === 'asc' ? 1 : -1;
      if (a1 > b1) {
        return compareResult;
      } else if (a1 < b1) {
        return -compareResult;
      }
      return 0;
    };
    return this.build(coll => coll.sort(comparator));
  }

  where(fn) {
    return this.build(coll => coll.filter(fn));
  }

  // BEGIN (write your solution here)
  get length() {
    return this.toArray().length;
  }

  toArray() {
    if (!this.memo) {
      this.memo = this.operations.reduce((acc, func) => func(acc), this.collection);
    }
    return this.memo;
  }
  // END
}

export default Enumerable;
