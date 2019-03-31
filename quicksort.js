function quicksort(A, p, r) {
  if (p < r) {
    let q = partition(A, p, r);
    quicksort(A, p, q - 1);
    quicksort(A, q + 1, r);
  }
}

function partition(A, p, r) {
  let x = A[r];
  let i = p - 1;
  let j;
  for (j = p; j <= r - 1; j++) {
    if (A[j] <= x) {
      i = i + 1;
      let tmp = A[i];
      A[i] = A[j];
      A[j] = tmp;
    }
  }
  let tmp = A[i + 1];
  A[i + 1] = A[r];
  A[r] = tmp;
  return i + 1;
}