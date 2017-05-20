// Node.js
// BEGIN
export default class {
  constructor(name, attributes) {
    this.name = name;
    this.attributes = attributes;
  }
  getAttributesAsLine() {
    return Object.keys(this.attributes).reduce((acc, key) =>
      `${acc} ${key}="${this.attributes[key]}"`, '');
  }
}
// END

// SingleTag.js
// BEGIN
import Node from './Node';

export default class extends Node {
  constructor(name, attributes = {}) {
    super(name, attributes);
  }

  toString() {
    return `<${this.name}${this.getAttributesAsLine()}>`;
  }
}
// END

// PairedTag.js
// BEGIN
import Node from './Node';

export default class extends Node {
  constructor(name, attributes = {}, body = '', children = []) {
    super(name, attributes);
    this.body = body;
    this.children = children;
  }

  toString() {
    const value = this.children.length > 0 ?
      this.children.map(child => child.toString()).join('') : this.body;
    return `<${this.name}${this.getAttributesAsLine()}>${value}</${this.name}>`;
  }
}
// END
