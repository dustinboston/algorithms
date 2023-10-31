const assert = require('assert');
const merge = require('./merge');

let A = [2, 4, 5, 7, 1, 2, 3, 6];
merge(A, 0, 3, A.length);
assert(A.toString(), '1,2,2,3,4,5,6,7');
