const assert = require("assert");
const heapsort = require("./heapsort");

let A = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7];
heapsort(A);
assert(A.toString() === '1,2,3,4,7,8,9,10,14,16');