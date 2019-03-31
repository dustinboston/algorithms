function parent(i) {
  return Math.floor(i / 2);
}

function left(i) {
  return 2 * i;
}

function right(i) {
  return 2 * i + 1;
}

// O(1)
function heapMaximum(A) {
  return A[0];
}

// O(log n)
function heapExtractMax(A) {
  if (A.heapSize < 0) {
    throw new Error("heap underflow");
  }
  const max = A[0];
  A[0] = A[A.heapSize];
  A.heapSize = A.heapSize - 1;
  maxHeapify(A, 0);
  return max;
}

// O(log n)
function heapIncreaseKey(A, i, key) {
  if (key < A[i]) {
    throw new Error("new key is smaller than current key");
  }
  A[i] = key;
  while (i > 0 && A[parent(i)] < A[i]) {
    let tmp = A[i];
    A[i] = A[parent(i)];
    A[parent(i)] = tmp;
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
  let l = left(i);
  let r = right(i);
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
    let tmp = A[i];
    A[i] = A[largest];
    A[largest] = tmp;
    maxHeapify(A, largest);
  }
}

// O(n), O(n log n)
function buildMaxHeap(A) {
  A.heapSize = A.length - 1;
  let i = Math.floor(A.length / 2);
  for (i; i >= 0; i--) {
    maxHeapify(A, i);
  }
}

// O(n log n)
function heapsort(A) {
  buildMaxHeap(A);
  let i;
  for (i = A.length - 1; i > 0; i--) {
    let tmp = A[0];
    A[0] = A[i];
    A[i] = tmp;
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
  maxHeapInsert
};
