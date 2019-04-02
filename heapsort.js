// Also see https://courses.csail.mit.edu/6.006/fall10/handouts/recitation10-8.pdf
// In JavaScript undefined is neither less than greater than or equal to a
// number // but null is always less than a number, which seems to be what the
// psuedocode in CLRS assumes, thus the returning of null in the parent, left,
// and right functions

function parent(i) {
  if (i === 1) {
    return null;
  } else {
    return Math.floor(i / 2);
  }
}

function left(A, i) {
  if (2 * i <= A.heapSize) {
    return 2 * i;
  } else {
    return null;
  }
}

function right(A, i) {
  if (2 * i + 1 <= A.heapSize) {
    return 2 * i + 1;
  } else {
    return null;
  }
}

function exchange(A, i, j) {
  let tmp = A[i];
  A[i] = A[j];
  A[j] = tmp;
}

// O(1)
function heapMaximum(A) {
  return A[0];
}

// O(log n)
function heapExtractMax(A) {
  if (A.heapSize < 0) {
    throw new Error('heap underflow');
  }
  const max = A[0];
  A[0] = A.pop(); // Remove the last item
  A.heapSize = A.heapSize - 1;
  maxHeapify(A, 0);
  return max;
}

// O(log n)
function heapIncreaseKey(A, i, key) {
  if (key < A[i]) {
    throw new Error('new key is smaller than current key');
  }
  A[i] = key;
  while (i > 0 && A[parent(i)] < A[i]) {
    exchange(A, i, parent(i));
    i = parent(i);
  }
}

// O(log n)
function maxHeapInsert(A, key) {
  A.heapSize = A.heapSize + 1;
  A[A.heapSize] = -Infinity;
  heapIncreaseKey(A, A.heapSize, key);
}

// O(log n)
function maxHeapify(A, i) {
  let l = left(A, i);
  let r = right(A, i);
  let largest;
  if (l <= A.heapSize && A[l] > A[i]) {
    largest = l;
  } else {
    largest = i;
  }
  if (r <= A.heapSize && A[r] > A[largest]) {
    largest = r;
  }
  if (largest !== i) {
    exchange(A, i, largest);
    maxHeapify(A, largest);
  }
}

// O(n), with maxHeapify O(n log n)
function buildMaxHeap(A) {
  A.heapSize = A.length - 1;
  let i = Math.floor(A.heapSize / 2);
  for (i; i >= 0; i--) {
    maxHeapify(A, i);
  }
}

// O(n log n)
function heapsort(A) {
  buildMaxHeap(A);
  let i;
  for (i = A.length - 1; i > 0; i--) {
    exchange(A, 0, i);
    A.heapSize = A.heapSize - 1;
    maxHeapify(A, 0);
  }
}

module.exports = {
  buildMaxHeap,
  heapsort,
  heapExtractMax,
  heapIncreaseKey,
  heapMaximum,
  maxHeapInsert,
};
