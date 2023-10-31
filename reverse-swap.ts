
const reverse = (str) => {
  const n = str.length;
  let arr = str.split('');
  let tmp;

  // swap characters from start and end of string
  // progressing inward
  for (let i = 0, j = n - 1; i < j; i++, j--) {
      tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
  }
  return arr.join('');
}

console.log(reverse('abcde'))