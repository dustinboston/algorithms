const assert = require('assert');
const {
  buildMaxHeap,
  heapExtractMax,
  heapIncreaseKey,
  heapMaximum,
  heapsort,
  maxHeapInsert,
} = require('./heapsort');

let A = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7];
heapsort(A);
assert(A.toString() === '1,2,3,4,7,8,9,10,14,16');

let A2 = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7];
buildMaxHeap(A2);
assert(A2.toString() === '16,14,9,10,8,1,4,2,3,7');
assert(heapMaximum(A2) === 16);

let A3 = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7];
buildMaxHeap(A3);
assert(heapExtractMax(A3) === 16);
assert(heapExtractMax(A3) === 14);
assert(heapExtractMax(A3) === 10);
assert(heapExtractMax(A3) === 9);
assert(heapExtractMax(A3) === 8);
assert(heapExtractMax(A3) === 7);
assert(heapExtractMax(A3) === 4);

let A4 = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7];
buildMaxHeap(A4);
assert(A4.toString() === '16,14,9,10,8,1,4,2,3,7');
heapIncreaseKey(A4, 6, 15); // A[6] => 4
assert(A4.toString() === '16,15,9,14,8,1,10,2,3,7');

let A5 = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7];
buildMaxHeap(A5);
assert(A5.toString() === '16,14,9,10,8,1,4,2,3,7');
maxHeapInsert(A5, 15);
assert(A5.toString() === '16,15,14,10,8,9,4,2,3,7,1');
