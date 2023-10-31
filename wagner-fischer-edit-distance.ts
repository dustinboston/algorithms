/**
 * @see Wagner, Robert A. and Fischer, Michael J. "The String-to-String Correction Problem". 
 *  J. ACM* 21.1 (1974): 168–173.
 * @param a - start word
 * @param b - target word
 * @returns a matrix of edit operations where d[a.length - 1][b.length - 1] is the result.
 */
export function editDistance(A: string, B: string) {
  const D: number[][] = [[0]];
  for (let i = 1; i <= A.length; i++) D[i] = [D[i - 1][0] + cost(A[i - 1], null)];
  for (let j = 1; j <= B.length; j++) D[0][j] = D[0][j - 1] + cost(null, B[j - 1]);
  for (let i = 1; i <= A.length; i++) {
    for (let j = 1; j <= B.length; j++) {
      const m1 = D[i - 1][j - 1] + cost(A[i - 1], B[j - 1]);
      const m2 = D[i - 1][j] + cost(A[i - 1], null);
      const m3 = D[i][j - 1] + cost(null, B[j - 1]);
      D[i][j] = Math.min(m1, m2, m3);
    }
  }
  return D;
}

/**
 * Determine the cost of an edit operation
 * @param a The value of a[i]
 * @param b The index of b[j]
 */
export function cost(a: string | null = null, b: string | null = null): number {
  if (a === b) return 0;
  if (a !== null && b !== null) return 1; // change
  if (a === null && b !== null) return 1; // insert
  if (a !== null && b === null) return 1; // delete
  throw new Error(`cost is broken a: ${a}, b: ${b}`);
};


