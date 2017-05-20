import Tree from 'hexlet-trees';

// BEGIN (write your solution here)
const getPath = pathString => pathString.split('/').filter(elem => elem);
// END

export default class {
  constructor() {
    this.tree = new Tree('/', { type: 'dir' });
  }

  // BEGIN (write your solution here)
  isDirectory(path) {
    const deepPath = this.tree.getDeepChild(getPath(path));
    if (deepPath && deepPath.getMeta().type === 'dir') {
      return true;
    }
    return false;
  }
  isFile(path) {
    const deepPath = this.tree.getDeepChild(getPath(path));
    if (deepPath && deepPath.getMeta().type === 'file') {
      return true;
    }
    return false;
  }
  mkdirSync(path) {
    const newPath = getPath(path);
    if (newPath.length > 1) {
      const deepPath = this.tree.getDeepChild(newPath.slice(0, -1));
      return deepPath.addChild(`${newPath[newPath.length - 1]}`, { type: 'dir' });
    }
    return this.tree.addChild(`${newPath[0]}`, { type: 'dir' });
  }
  touchSync(path) {
    const newPath = getPath(path);
    if (newPath.length > 1) {
      const deepPath = this.tree.getDeepChild(newPath.slice(0, -1));
      return deepPath.addChild(`${newPath[newPath.length - 1]}`, { type: 'file' });
    }
    return this.tree.addChild(`${newPath[0]}`, { type: 'file' });
  }
  // END
}
