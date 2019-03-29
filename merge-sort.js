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