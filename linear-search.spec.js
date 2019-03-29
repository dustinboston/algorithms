const assert = require("assert");
const linearSearch = require("./linear-search");

const a = [5, 2, 4, 6, 1, 3];
const resultA = linearSearch(a, 6);
assert(resultA === 3);

const b = [31, 41, 59, 26, 41, 58];
const resultB = linearSearch(b, 6);
assert(resultB === null);