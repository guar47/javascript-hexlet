const singleTagsList = new Set(['hr', 'img', 'br']);

// Формирует html строку, на основе AST дерева
export const render = ({ name, attributes, body, children }) => {
  const attrsLine = Object.keys(attributes).reduce((acc, key) =>
    `${acc} ${key}="${attributes[key]}"`, '');
  const content = children.length > 0 ? children.map(render).join('') : body;
  // Проверка на одиночные теги
  if (singleTagsList.has(name)) {
    return `<${name}${attrsLine}>`;
  }

  return `<${name}${attrsLine}>${content}</${name}>`;
};

// Определяет действие объекта в зависимости от имени, необходимо для рекурсии
const argDo = {
  body: arg => arg,
  children: arg => arg.map(a => parse(a)),
  attributes: arg => arg,
};

// Хранилище имен, определяет имя на основании типа объекта
const argTypes = {
  body: a => typeof a === 'string',
  children: a => a instanceof Array,
  attributes: a => a instanceof Object,
};

// Функция определяет и возвращает имя объекта используя хранилище имен argTypes
const getAttrName = arg =>
  Object.keys(argTypes).filter(key => argTypes[key](arg))[0];

// Парсинг html данных в AST дерево, путем формирования имен и данных объектов,
// и изменении аккумулятора
export const parse = data =>
  data.slice(1)
  .reduce((acc, arg) => ({ ...acc, [getAttrName(arg)]: argDo[getAttrName(arg)](arg) }),
    { name: data[0], attributes: {}, body: '', children: [] });
