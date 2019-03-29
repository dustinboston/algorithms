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
