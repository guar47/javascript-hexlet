class Enumerable {
  // BEGIN (write your solution here)
  constructor(collection, operations) {
    this.collection = collection;
    this.operations = operations || [];
  }
  select(fn) {
    const newOps = this.operations.slice();
    newOps.push(coll => coll.map(fn));
    return new Enumerable(this.collection, newOps);
  }
  orderBy(fn, direction) {
    const comparator = (a, b) => {
      const a1 = fn(a);
      const b1 = fn(b);

      const result = direction === 'asc' ? 1 : -1;
      if (a1 > b1) {
        return result;
      } else if (a1 < b1) {
        return -result;
      }
      return 0;
    };
    const newOps = this.operations.slice();
    newOps.push(coll => coll.sort(comparator));
    return new Enumerable(this.collection, newOps);
  }
  where(fn) {
    const newOps = this.operations.slice();
    newOps.push(coll => coll.filter(fn));
    return new Enumerable(this.collection, newOps);
  }
  toArray() {
    const result = this.collection.slice();
    return this.operations.reduce((acc, func) => func(acc), result);
  }
  // END
}

const cars = [
  { brand: 'bmw', model: 'm5', year: 2014 },
  { brand: 'bmw', model: 'm4', year: 2013 },
  { brand: 'kia', model: 'sorento', year: 2014 },
  { brand: 'kia', model: 'rio', year: 2010 },
  { brand: 'kia', model: 'sportage', year: 2012 },
];
const coll = new Enumerable(cars);

console.log(coll.orderBy(car => car.year, 'asc').toArray());
