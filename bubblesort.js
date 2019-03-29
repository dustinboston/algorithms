function bubblesort(A) {
  let i;
  for (i = 0; i <= A.length; i++) {
    let j;
    for (j = A.length; j >= i; j--) {
      if (A[j] < A[j - 1]) {
        let tmp = A[j];
        A[j] = A[j - 1];
        A[j - 1] = tmp;
      }
    }
  }
}

module.exports = bubblesort;