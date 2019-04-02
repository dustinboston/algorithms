const assert = require('assert');
const bubblesort = require('./bubblesort');

let a = [5, 2, 4, 6, 1, 3];
bubblesort(a);
assert(a.toString() === '1,2,3,4,5,6');

let b = [31, 41, 59, 26, 41, 58];
bubblesort(b);
assert(b.toString() === '26,31,41,41,58,59');
