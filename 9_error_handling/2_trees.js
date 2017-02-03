class Tree {
  constructor(key, meta, parent) {
    this.parent = parent;
    this.key = key;
    this.meta = meta;
    this.children = new Map();
  }

  getKey() {
    return this.key;
  }

  getMeta() {
    return this.meta;
  }

  addChild(key, meta) {
    const child = new Tree(key, meta, this);
    this.children.set(key, child);

    return child;
  }

  getChild(key) {
    return this.children.get(key);
  }

  // BEGIN (write your solution here)
  hasChild(key) {
    return this.children.has(key);
  }
  getParent() {
    return this.parent;
  }
  removeChild(key) {
    this.children.delete(key);
  }
  hasChildren() {
    return this.children.size > 0;
  }
  getDeepChild(keys) {
    return keys.reduce((node, key) => node && node.getChild(key), this);
  }
  getChildren() {
    return [...this.children.values()];
  }
}
