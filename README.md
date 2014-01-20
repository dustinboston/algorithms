Algorithms
================================================================================

Algorithms from Introduction to Alogrithms, written in JavaScript.

* [Insertion Sort](#insertion-sort)
* [Selection Sort](#selection-sort)
* [Linear Search](#linear-search)

Insertion Sort
--------------------------------------------------------------------------------

```javascript
var a;

function insertionSort (A) {
  var j, key, i;
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
```

Selection Sort
--------------------------------------------------------------------------------

```javascript
var a;

function selectionSort (A) {
  var n, i, min, j, temp;
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
```

Linear Search
--------------------------------------------------------------------------------

```javascript
var a, result;

function linearSearch (A, v) {
  var i;
  for (i = 0; i < A.length; i += 1) {
    if (A[i] === v) {
      return i;  
    }
  }
  return null;
}

a = [5, 2, 4, 6, 1, 3];
result = linearSearch(a, 6);
console.log(result);

a = [31, 41, 59, 26, 41, 58];
result = linearSearch(a, 6);
console.log(result);
```
