let a;

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


a = [5, 2, 4, 6, 1, 3];
insertionSort(a);
console.log(a);

a = [31, 41, 59, 26, 41, 58];
insertionSort(a);
console.log(a);
