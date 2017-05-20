// Node.js
// BEGIN (write your solution here)
function getAttributesAsLine() {
  return Object.keys(this.attributes).reduce((acc, key) =>
      `${acc} ${key}="${this.attributes[key]}"`, '');
}

function Node(name, attributes) {
  this.name = name;
  this.attributes = attributes;
  this.getAttributesAsLine = getAttributesAsLine;
}
// END

// PairedTag.js
// BEGIN (write your solution here)
function toString() {
  const value = this.children.length > 0 ?
  this.children.map(child => child.toString()).join('') : this.body;
  return `<${this.name}${this.getAttributesAsLine()}>${value}</${this.name}>`;
}

function PairedTag(name, attributes, body, children) {
  Node.call(this, name, attributes);
  this.body = body;
  this.children = children;
  this.toString = toString();
}
// END

// SingleTag.js
// BEGIN (write your solution here)
function toString() {
  return `<${this.name}${this.getAttributesAsLine()}>`;
}

function SingleTag(name, attributes) {
  Node.call(this, name, attributes);
  this.toString = toString;
}
// END
