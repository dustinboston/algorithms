let a, result;

function linearSearch (A, v) {
  let i;
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
