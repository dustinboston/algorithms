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
  for (k = p; k <= r - 1; k++) {
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
