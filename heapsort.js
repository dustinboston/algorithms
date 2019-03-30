function parent(i) {
  return Math.floor(i/2);
}

function left(i) {
  return 2 * i;
}

function right(i) {
  return (2 * i) + 1;
}

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

function buildMaxHeap(A) {
  A.heapSize = A.length - 1;
  let i = Math.floor((A.length)/2);
  for (i; i >= 0; i--) {
    maxHeapify(A, i);
  }
}

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

module.exports = heapsort;