const takeFirst = (start, next, skip) => {
  if (skip === 0) {
    return start;
  }
  return takeFirst(next(start), next, skip - 1);
};

class InfinitySeq {
  constructor(start, next, skip = 0, take = Infinity) {
    this.start = start;
    this.next = next;
    this.skipCount = skip;
    this.takeCount = take;

    this[Symbol.iterator] = function* () {
      let current = takeFirst(start, next, skip);
      let count = 0;
      while (count < take) {
        count++;
        yield current;
        current = next(current);
      }
    };
  }

  take(count) {
    return new InfinitySeq(this.start, this.next, this.skipCount, count);
  }

  skip(count) {
    return new InfinitySeq(this.start, this.next, count, this.takeCount);
  }
}

export default InfinitySeq;
