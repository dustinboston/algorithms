# Algorithms

Algorithms from Introduction to Alogrithms, written in JavaScript.

* [Insertion sort](#insertion-sort)
* [Selection sort](#selection-sort)
* [Merge sort](#merge-sort)
* [Linear search](#linear-search)

## Insertion sort

```js
function insertionSort (A) {
  let j, key, i;
  for (j = 1; j < A.length; j += 1) {
    key = A[j];
    // Insert A[j] into the sorted sequence A[1..j - 1]
    i = j - 1;
    // Change A[i] > key to A[i] < key to sort non-increasing, that's it.
    while (i >= 0 && A[i] > key) {
      A[i + 1] = A[i];
      A[i] = key;
      i = i - 1;
    }
  }
}

module.exports = insertionSort;
```

## Selection sort

```js
function selectionSort(A) {
  let n, i, min, j, temp;
  n = A.length;
  for (i = 0; i < n; i += 1) {
    min = i;
    for (j = i + 1; j < n; j += 1) {
      if (A[j] < A[min]) {
        min = j;
      }
    }
    temp = A[i];
    A[i] = A[min];
    A[min] = temp;
  }
}

module.exports = selectionSort;
```

## Merge sort

```js
// A is an array (zero-based)
// p, q, r are indicies numbering the elements of the array such that
// p <= q < r, assumes that both subarrays are sorted
function merge(A, p, q, r) {
  let n1 = q - p + 1;
  let n2 = r - 1 - q;

  // Create arrays L[1..n1+1] and R[1..n2+1]
  let L = [];
  let i;
  for (i = 1; i <= n1; i++) {
    L[i - 1] = A[p + i - 1];
  }

  let R = [];
  let j;
  for (j = 1; j <= n2; j++) {
    R[j - 1] = A[q + j];
  }
  L[n1] = Infinity;
  R[n2] = Infinity;

  i = 0;
  j = 0;
  let k;
  for(k = p; k <= r - 1; k++) {
    if (L[i] <= R[j]) {
      A[k] = L[i];
      i = i + 1;
    } else {
      A[k] = R[j];
      j = j + 1;
    }
  }
}

module.exports = merge;

const merge = require('./merge');

function mergeSort(A, p, r) {
  if (p < r) {
    let q = (p + r) / 2;
    mergeSort(A, p, q);
    mergeSort(A, q + 1, r);
    merge(A, p, q, r);
  }
}

module.exports = mergeSort;
```

## Linear search

```js
function linearSearch (A, v) {
  let i;
  for (i = 0; i < A.length; i += 1) {
    if (A[i] === v) {
      return i;  
    }
  }
  return null;
}

module.exports = linearSearch;
```

