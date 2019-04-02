const assert = require('assert');
const mergeSort = require('./merge-sort');

let A = [5, 2, 4, 7, 1, 3, 2, 6];
mergeSort(A, 0, A.length);
assert(A.toString(), '1,2,2,3,4,5,6,7');
