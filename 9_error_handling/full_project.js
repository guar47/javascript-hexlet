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
// -------------------------------------------------------------
const getPathParts = path =>
  path.split('/').filter(part => part !== '');

class HexletFs {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(path) {
    const current = this.tree.getDeepChild(getPathParts(path));
    return current.getMeta().getStats();
  }

  touchSync(path) {
    const parts = getPathParts(path);
    const name = parts[parts.length - 1];
    const parent = this.tree.getDeepChild(parts.slice(0, -1));
    return parent.addChild(name, new File(name));
  }

  mkdirSync(path) {
    const parts = getPathParts(path);
    const name = parts[parts.length - 1];
    const parent = this.tree.getDeepChild(parts.slice(0, -1));
    return parent.addChild(name, new Dir(name));
  }
}
// -------------------------------------------------------------
class Stats {
  constructor(file, directory) {
    this.file = file;
    this.directory = directory;
  }

  isFile() {
    return this.file;
  }

  isDirectory() {
    return this.directory;
  }
}

class Node {
  constructor(name) {
    this.name = name;
  }

  getStats() {
    return new Stats(this.isFile(), this.isDirectory());
  }

  getName() {
    return this.name;
  }
}

class Dir extends Node {
  constructor(name, body) {
    super(name);
    this.body = body;
  }
  getBody() {
    return this.body;
  }
  isDirectory() {
    return true;
  }

  isFile() {
    return false;
  }
}

class File extends Node {
  constructor(name, body) {
    super(name);
    this.body = body;
  }
  getBody() {
    return this.body;
  }
  isDirectory() {
    return false;
  }
  isFile() {
    return true;
  }
}

let files = new HexletFs();
files.mkdirSync('/etc');
//files.statSync('/etc')
console.log(files.statSync('/etc'));
