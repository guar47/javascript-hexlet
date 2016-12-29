//////////////////////////
// card.js
//////////////////////////

export const getName = (self) =>
  getMethod(self, 'getName')(contents(self));

// BEGIN (write your solution here)
export const damage = (self, health) =>
  getMethod(self, 'damage')(contents(self), health);
// END

//////////////////////////
// generic.js
//////////////////////////

let methods = l();

export const getMethod = (obj, methodName) => {
  // BEGIN (write your solution here)
  const iter = (methods) => {
    if (isEmpty(methods)) {
      return methods;
    } if (typeTag(obj) === typeTag(head(methods)) && methodName === pairs.car(contents(head(methods)))) {

      return pairs.cdr(contents(head(methods)));
    }
    return iter(tail(methods));
  };
  return iter(methods);
  // END
};

export const definer = (type) =>
  (methodName, f) => {
    methods = cons(attach(type, pairs.cons(methodName, f)), methods);
  };
//////////////////////////
// simpleCard.js
/////////////////////////
// BEGIN (write your solution here)
const defmethod = definer('simpleCard');

export const make = (name, damage) =>
  attach('simpleCard', cons(name, damage));

defmethod('getName', (self) => car(self));

defmethod('damage', (self) => cdr(self));
// END
