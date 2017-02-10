import EventEmitter from 'events';

class Tree extends EventEmitter {
  constructor(key, parent) {
    super();
    this.parent = parent;
    this.key = key;
    this.children = new Map();
  }

  getKey() {
    return this.key;
  }

  getParent() {
    return this.parent;
  }

  // BEGIN (write your solution here)
  addChild(key) {
    const child = new Tree(key, this);
    this.children.set(key, child);
    this.emit('add', child);
  }

  removeChild(key) {
    const child = this.children.get(key);
    this.emit('remove', child);
    this.children.delete(key);
  }
  // END
}

export default Tree;
