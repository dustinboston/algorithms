/**
 * Also see ./finite-automata.js (Intro to Algos version of a Suffix Array)
 */

/**
 * Longest repeated substring
 * Find the longest repeated substring that appears at least 2x
 * Repetitions can overlap if they are distinct
 * @param {string} text 
 * @returns {string}
 */
export function lrs(text) {
  const n = text.length;
  const sa = new SuffixArray(text);
  let lrs = '';
  for (let i = 1; i < n; i++) {
    const length = sa.lcp(i);
    if (length > lrs.length) {
      lrs = text.substring(sa.index(i), sa.index(i) + 1);
    }
  }
  return lrs;
}

export function rank(s) {
  const sa = new SuffixArray(s);
  const ranked = [];
  for (let i = 0; i < s.length; i++) {
    const index = sa.index(i);
    const ith = s.substring(index, Math.min(index + 50, s.length));
    const rank = sa.rank(s.substring(index));
    if (i === 0) {
      ranked.push({ i, index, lcp: '-', rank, ith });
    } else {
      const lcp = sa.lcp(i);
      ranked.push({ i, index, lcp, rank, ith });
    }
  }
  return ranked;  
}

class Suffix {
  #text = '';
  #index = 0;

  constructor(text, index) {
    this.#text = text;
    this.#index = index;
  }

  index() {
    return this.#index;
  }

  length() {
    return this.#text.length - this.#index;
  }

  /** 
   * Gets the value of the char at the specified index
   * @param {number} i - index of character in text 
   * @returns {number | undefined} - Unicode value of the char
   */
  charCodeAt(i) {
    return this.#text.charCodeAt(this.#index + i);
  }

  /** 
   * @param {Suffix} that
   * @returns {number}
   */
  compareTo(that) {
    if (Object.is(this, that)) return 0; // optimization
    const n = Math.min(this.length(), that.length());
    for (let i = 0; i < n; i++) {
      if (this.charCodeAt(i) < that.charCodeAt(i)) return -1;
      if (this.charCodeAt(i) > that.charCodeAt(i)) return +1;
    }
    return this.length() - that.length();
  }

  toString() {
    return this.#text.substring(this.#index);
  }
}

class InvalidArgument extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidArgumentError'
  }
}

class SuffixArray {
  /** @type {Suffix[]} suffixes */
  suffixes = [];

  /** @param {string} text - input string */
  constructor(text) {
    const n = text.length;
    this.suffixes = [];
    for (let i = 0; i < n; i++) {
      this.suffixes[i] = new Suffix(text, i);
    }
    this.suffixes.sort((a, b) => a.compareTo(b));
  }

  length() {
    return this.suffixes.length;
  }

  /**
   * Gets the index of the _i_th smallest suffix in the original text
   * @param {number} i 
   * @returns {number}
   */
  index(i) {
    if (i < 0 || i >= this.length()) throw new InvalidArgument('i');
    return this.suffixes[i].index();
  }

  /**
   * Gets the longest common prefix between the _i_th
   * smallest suffix, and the previous smallest suffix
   * @param {number} i 
   * @returns {number}
   */
  lcp(i) {
    if (i < 0 || i >= this.length()) throw new InvalidArgument('i');
    return this.#lcpSuffix(this.suffixes[i], this.suffixes[i - 1]);
  }

  /**
   * 
   * @param {Suffix} s 
   * @param {Suffix} t 
   * @returns {number}
   */
  #lcpSuffix(s, t) {
    const n = Math.min(s.length(), t.length());
    for (let i = 0; i < n; i++) {
      if (s.charCodeAt(i) !== t.charCodeAt(i)) return i;
    }
    return n;
  }

  /**
   * Get the _i_th smallest suffix
   * @param {number} i 
   * @returns {string}
   */
  select(i) {
    if (i < 0 || i >= this.length()) throw new InvalidArgument('i');
    return this.suffixes[i].toString();
  }  

  rank(query) { // binary search
    let lo = 0;
    let hi = this.length() - 1;
    while (lo <= hi) {
      const mid = Math.ceil(lo + (hi - lo) / 2);
      const cmp = this.compare(query, this.suffixes[mid]);
      if (cmp < 0) hi = mid - 1;
      else if (cmp > 0) lo = mid + 1;
      else return mid;
    }
    return lo;
  }

  /**
   * 
   * @param {string} query 
   * @param {Suffix} suffix 
   * @returns {number}
   */
  compare(query, suffix) {
    if (!suffix) throw new InvalidArgument('suffix');
    const n = Math.min(query.length, suffix.length());
    for (let i = 0; i < n; i++) {
      if (query.charCodeAt(i) < suffix.charCodeAt(i)) return -1;
      if (query.charCodeAt(i) > suffix.charCodeAt(i)) return +1;
    }
    return query.length - suffix.length();
  }
}

// Tests
const pad = (v, a = 2) => v.toString().padStart(a, ' ');

Deno.test("rank banana",  () => {
  const input = 'banana';
  const result = rank(input);

  const expected = '5 3 1 0 4 2'
  const actual = [];

  result.forEach(e => {
    actual.push(e.index);
    console.log('%s %s %s %s %s', pad(e.i), pad(e.index), pad(e.lcp), pad(e.rank), e.ith);
  });

  if (expected !== actual.join(' ')) {
    throw new Error(`expected: "${expected}", actual: "${actual.join(' ')}"`);
  }
});

Deno.test("lrs banana",  () => {
  const input = 'banana';

  const expected = 'na'
  const actual = lrs(input);

  if (expected !== actual) {
    throw new Error(`expected: "${expected}", actual: "${actual}"`);
  }
});

Deno.test("rank geeks", () => {
  const input = 'geeksforgeeks';
  const result = rank(input);

  const expected = '9 1 10 2 5 8 0 11 3 6 7 12 4'
  const actual = [];

  result.forEach(e => {
    actual.push(e.index);
    console.log('%s %s %s %s %s', pad(e.i), pad(e.index), pad(e.lcp), pad(e.rank), e.ith);
  });

  if (expected !== actual.join(' ')) {
    throw new Error(`expected: "${expected}", actual: "${actual.join(' ')}"`);
  }
});

Deno.test("rank abaab", () => {
  const input = 'abaab';
  const result = rank(input);

  const expected = '2 3 0 4 1'
  const actual = [];

  result.forEach(e => {
    actual.push(e.index);
    console.log('%s %s %s %s %s', pad(e.i), pad(e.index), pad(e.lcp), pad(e.rank), e.ith);
  });

  if (expected !== actual.join(' ')) {
    throw new Error(`expected: "${expected}", actual: "${actual.join(' ')}"`);
  }
});