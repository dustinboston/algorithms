import { assertEquals } from './test-utils.js';

/**
 * 
 * @param {string} T text
 * @param {(q: number, a: string) => number} d transition function
 * @param {number} m length of pattern (P), acceptance state
 */
function* finiteAutomatonMatcher(T, d, m) {
  const n = T.length;
  let q = 0;
  for (let i = 1; i <= n; i++) {
    q = d(q, T[i]);
    if (q === m) {
      console.log("pattern occurs with shift %s", i - m);
      yield i - m;
    }
  }
}

/**
 * 
 * @param {string} pattern pattern
 * @param {string[]} alphabet input alphabet
 * @returns {(q: number, a: string) => number}
 */
const computeTransitionFunction = (pattern, alphabet) => {
  const m = pattern.length;
  const d  = (q, a) => d[q]?.[a];
  for (let q = 0; q <= m; q++) {
    if (!Object.hasOwn(d, q)) d[q] = {};
    for (let a of alphabet) {
      let k = Math.min(m + 1, q + 2);
      do { k--; } 
      while (!(pattern.substring(0, q) + a).endsWith(pattern.substring(0, k)));
      d[q][a] = k;
    }
  }
  return d;
};

function computeTransitionFunction(P, Sigma) {
  const m = P.length;
  const delta = [];
  for (let q = 0; q <= m; q++) {
    delta[q] = {};
    for (const a of Sigma) {
      let k = Math.min(m + 1, q + 2);
      let suffix = P.slice(0, q + 1) + a;
      let candidate = P.slice(0, k);
      do {
        k--;
        candidate = P.slice(0, k);
      } while (suffix !== candidate + P.slice(k));
      delta[q][a] = k;
    }
  }
  return (q, a) => delta[q][a];
}




Deno.test('test abs',  () => {
  const input = 'abababacaba';
  const pattern = 'ababaca';
  const alphabet = 'abc';
  const suffixFn = computeTransitionFunction(pattern, alphabet);
  const iter = finiteAutomatonMatcher(input, suffixFn, input.length);
  const actual = Array.from(iter).toString();
  const expected = 7;
  assertEquals(expected, actual);
});

Deno.test('test compute',  () => {
  const input = 'abababacaba';
  const pattern = 'ababaca';
  const alphabet = 'abc';
  const suffixFn = computeTransitionFunction(pattern, alphabet);

  const expected = [
    { a: 1, b: 0, c: 0 },
    { a: 1, b: 2, c: 0 },
    { a: 3, b: 0, c: 0 },
    { a: 1, b: 4, c: 0 },
    { a: 5, b: 0, c: 0 },
    { a: 1, b: 4, c: 6 },
    { a: 7, b: 0, c: 0 },
    { a: 1, b: 2, c: 0 },
  ];

  for (let i = 0; i < expected.length; i++) {
    assertEquals(suffixFn(i, 'a'), expected[i]['a']);
    assertEquals(suffixFn(i, 'b'), expected[i]['b']);
    assertEquals(suffixFn(i, 'c'), expected[i]['c']);
  }

});


Deno.test('0..m', () => {
  const P = 'ababaca';
  const m = P.length;
  let q = 0;
  for (q; q < m; q++) {}
  assertEquals(m, q);
});