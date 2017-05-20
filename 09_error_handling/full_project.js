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
    if (!parent || !parent.getMeta().getStats().isDirectory()) {
      return false;
    }
    return parent.addChild(name, new File(name));
  }
  mkdirpSync(path) {
    return getPathParts(path).reduce((subtree, part) => {
      if (!subtree) {
        return false;
      }
      const current = subtree.getChild(part);
      if (!current) {
        return subtree.addChild(part, new Dir(part));
      }
      if (!current.getMeta().getStats().isDirectory()) {
        return false;
      }
      return current;
    }, this.tree);
  }
  rmdirSync(path) {
    const parts = getPathParts(path);
    const name = parts[parts.length - 1];
    const parent = this.tree.getDeepChild(parts.slice(0, -1));
    const current = this.tree.getDeepChild(parts);
    if (!current || !current.getMeta().getStats().isDirectory() || current.hasChildren()) {
      return false;
    }
    parent.removeChild(name);
  }
  readdirSync(path) {
    const parts = getPathParts(path);
    const current = this.tree.getDeepChild(parts);
    if (!current || !current.getMeta().getStats().isDirectory()) {
      return false;
    }
    return current.getChildren().map(node => node.getKey());
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
