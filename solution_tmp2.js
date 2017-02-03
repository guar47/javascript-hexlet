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

const getPath = pathString => pathString.split('/').filter(elem => elem);

class HexletFs {
  constructor() {
    this.tree = new Tree('/', { type: 'dir' });
  }
  isDirectory(path) {
    const deepPath = this.tree.getDeepChild(getPath(path));
    return deepPath && deepPath.getMeta().type === 'dir';
  }
  isFile(path) {
    const deepPath = this.tree.getDeepChild(getPath(path));
    return deepPath && deepPath.getMeta().type === 'file';
  }
  mkdirSync(path) {
    const newPath = getPath(path);
    const deepPath = this.tree.getDeepChild(newPath.slice(0, -1));
    return deepPath.addChild(`${newPath[newPath.length - 1]}`, { type: 'dir' });
  }
  touchSync(path) {
    const newPath = getPath(path);
    const deepPath = this.tree.getDeepChild(newPath.slice(0, -1));
    return deepPath.addChild(`${newPath[newPath.length - 1]}`, { type: 'file' });
  }
}

let files;
files = new HexletFs();
files.mkdirSync('/etc');
files.mkdirSync('/etc/nginx');
files.mkdirSync('/var/')
files.mkdirSync('/var//log//////');
files.touchSync('/file.txt');
files.mkdirSync('/etc');
files.touchSync('/etc/bashrc');
console.log(files.isFile('/etc/bashrc'));
