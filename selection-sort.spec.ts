const assert = require('assert');
const selectionSort = require('./selection-sort');

let a = [5, 2, 4, 6, 1, 3];
selectionSort(a);
assert(a.toString() === '1,2,3,4,5,6');

let b = [31, 41, 59, 26, 41, 58];
selectionSort(b);
assert(b.toString() === '26,31,41,41,58,59');
