let a;

function selectionSort (A) {
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

a = [5, 2, 4, 6, 1, 3];
selectionSort(a);
console.log(a);

a = [31, 41, 59, 26, 41, 58];
selectionSort(a);
console.log(a);

