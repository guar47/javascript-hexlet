class SingleTag {
  constructor(name = '', attributes = {}, body = '', children = []) {
    this.name = name;
    this.attributes = attributes;
    this.body = body;
    this.children = children;
  }
  toString() {
    const attrsLine = Object.keys(this.attributes).reduce((acc, key) =>
    `${acc} ${key}="${this.attributes[key]}"`, '');
    return `<${this.name}${attrsLine}>`;
  }
}

class PairedTag {
  constructor(name = '', attributes = {}, body = '', children = []) {
    this.name = name;
    this.attributes = attributes;
    this.body = body;
    this.children = children;
  }
  toString() {
    const attrsLine = Object.keys(this.attributes).reduce((acc, key) =>
    `${acc} ${key}="${this.attributes[key]}"`, '');
    const value = this.children.length > 0 ?
      this.children.map(child => child.toString()).join('') : this.body;
    return `<${this.name}${attrsLine}>${value}</${this.name}>`;
  }
}


const argTypes = {
  body: arg => typeof arg === 'string',
  children: arg => arg instanceof Array,
  attributes: arg => arg instanceof Object,
};

const argDo = {
  body: arg => arg,
  children: arg => arg.map(a => parse(a)),
  attributes: arg => arg,
};

const getAttrName = arg => Object.keys(argTypes).filter(key => argTypes[key](arg))[0];

const buildNode = (name, attributes, body, children) => {
  const singleTagsList = new Set(['hr', 'img', 'br']);
  if (singleTagsList.has(name)) {
    return new SingleTag(name, attributes, body, children);
  }
  return new PairedTag(name, attributes, body, children);
};

const parse = (data) => {
  const args = data.slice(1)
    .reduce((acc, arg) => ({ ...acc,
      [getAttrName(arg)]: argDo[getAttrName(arg)](arg),
    }), { name: data[0], attributes: {}, body: '', children: [] });
  return buildNode(args.name, args.attributes, args.body, args.children);
};

const data = ['html', [
  ['head', [
    ['title', 'hello, hexlet!'],
  ]],
  ['body', [
    ['h1', { class: 'header' }, 'html builder example'],
    ['div', [
      ['span', 'span text'],
      ['hr'],
    ]],
  ]],
]];

console.log(buildNode(data));
