// PairedTag.js
// BEGIN
import Node from './Node';

export default function PairedTag(name, attribues = {}, body = '', children = []) {
  Node.apply(this, [name, attribues]);
  this.body = body;
  this.children = children;
}

PairedTag.prototype.toString = function toString() {
  const value = this.children.length > 0 ?
    this.children.map(child => child.toString()).join('') : this.body;
  return `<${this.name}${this.getAttributesAsLine()}>${value}</${this.name}>`;
};
// END

// SingleTag.js
// BEGIN
import Node from './Node';

export default function SingleTag(name, attributes = {}) {
  Node.apply(this, [name, attributes]);
}

SingleTag.prototype.toString = function toString() {
  return `<${this.name}${this.getAttributesAsLine()}>`;
};
// END
