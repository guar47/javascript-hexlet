// export const If = (bool) => (p) => (m) => bool(p)(m);
// export const True = (x) => (y) => x;
// export const False = (x) => (y) => y;

const If = function(bool) {
        return bool;
};

const True = function (x) {
    return function (y) {
        return x;
    }
};

const False = function (x) {
    return function (y) {
        return y;
    }
};

console.log(If(True)('one')('two'));

console.log(True('one')('two'));
