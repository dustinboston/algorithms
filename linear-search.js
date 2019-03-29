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