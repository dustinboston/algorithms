const assert = require("assert");
const quicksort = require('./quicksort');

let A = [2, 8, 7, 1, 3, 5, 6, 4];
quicksort(A, 0, A.length);
assert(A.toString() === '1,2,3,4,5,6,7,8');
