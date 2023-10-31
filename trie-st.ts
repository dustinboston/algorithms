/**
 * TrieST from Algorithms, 4th Edition, with help from
 * https://learnersbucket.com/tutorials/data-structures/trie-data-structure-in-javascript/ 
 */

const Alphabet = require('./trie-st-alpha.js');

class TrieNode {
  /** @type {TrieNode[]} */
  next = void 0;

  /** @type {any} */
  val = void 0;
}

class TrieST {
  /** @type {TrieNode} */
  #root;

  /** @type {number} */
  #R;

  /** @type {Alphabet} */
  #alphabet;

  constructor(alphabet) {
    if (!alphabet || !(alphabet instanceof Alphabet)) {
      throw new Error('An alphabet is required');
    }
    this.#alphabet = alphabet;
    this.#R = alphabet.radix();
  }

  /**
   * Create an instance of TrieNode with next initialized 
   * @returns {TrieNode}
   */
  #createTrieNode() {
    const x = new TrieNode();
    x.next = Array(this.#R).fill(void 0);
    return x;
  }

  /**
   * @param {string} key 
   * @returns {any}
   */
  getValue(key) {
    const x = this.#getNode(this.#root, key, 0);
    if (x === void 0) return;
    return x.val;
  }

  /**
   * @param {TrieNode} x 
   * @param {string} key 
   * @param {number} d 
   * @returns {TrieNode}
   */
  #getNode(x, key, d) {
    if (x === void 0) return;
    if (d == key.length) return x;
    const c = this.#alphabet.toIndex(key.charAt(d))
    return this.#getNode(x.next[c], key, d + 1);
  }

  /**
   * @param {string} key 
   * @param {any} val 
   */
  put(key, val) {
    this.#root = this.#putNode(this.#root, key, val, 0);
  }

  /**
   * @param {TrieNode} x 
   * @param {string} key 
   * @param {any} val 
   * @param {number} d 
   * @returns {TrieNode}
   */
  #putNode(x, key, val, d) {
    // Change value associated with key if in subtrie rooted at x.
    if (x === void 0) x = this.#createTrieNode();
    if (d === key.length) { x.val = val; return x; }
    // Use dth key char to identify subtrie.
    const c = this.#alphabet.toIndex(key.charAt(d))
    x.next[c] = this.#putNode(x.next[c], key, val, d + 1);
    return x;
  }

  /**
   * 
   * This is iterative to prevent the stack
   * from overflowing with a recursive impl.
   * @param {TrieNode} x 
   * @returns {number}
   */
  size() {
    const procStack = [];
    procStack.push(this.#root);

    let cnt = 0;
    while (procStack.length) {
      let x = procStack.pop();
      if (x === void 0) continue;
      if (x.val !== void 0) cnt++;

      for (let c = this.#R - 1; c >= 0; c--) {
        procStack.push(x.next[c]);
      }
    }
    return cnt;
  }

  /**
   * 
   * @returns {string[]}
   */
  keys() {
    return this.keysWithPrefix("");
  }

  /**
   * 
   * This is iterative to prevent the stack
   * from overflowing with a recursive impl.
   * @param {string} p 
   * @returns {string[]}
   */
  keysWithPrefix(pre) {
    /** @type {string[]} */
    const prefixQueue = [];

    /** @type {string} */
    const p = pre;

    /** @type {[TrieNode, string][]} */
    const procStack = [];
    const rootNode = this.#getNode(this.#root, p, 0);
    procStack.push([rootNode, p]);

    while (procStack.length) {
      let [x, tmpPre] = procStack.pop();

      // collect()
      if (x === void 0) continue;
      if (x.val !== void 0) {
        prefixQueue.push(pre.length ? tmpPre : p + tmpPre);
      }

      // Iterate in reverse to evaluate in order
      for (let c = this.#R - 1; c >= 0; c--) {
        const char = this.#alphabet.toChar(c);
        procStack.push([x.next[c], tmpPre + char]);
      }
    }

    return prefixQueue;
  }

  /**
   * Find keys that match a pattern
   * 
   * Match a pattern where "." is the wild
   * card. Will only find keys of the same
   * length as the pattern.
   * 
   * This is iterative to prevent the stack
   * from overflowing with a recursive impl.
   * 
   * @param {string} pat 
   * @returns {string[]}
   */
  keysThatMatch(pat) {
    /* @type {string[]} */
    const prefixQueue = [];

    /** @type {string} */
    let pre = '';

    /** @type {number} */
    let patLen = pat.length;

    /** @type {[TrieNode, string][]} */
    const procStack = [];
    const rootNode = this.#getNode(this.#root, pre, 0);
    procStack.push([rootNode, pre]);

    while (procStack.length) {
      const [x, tmpPre] = procStack.pop();

      // collect()
      const preLen = pre.length + tmpPre.length;
      if (x === void 0) continue;
      if (preLen === patLen && x.val !== void 0) {
        prefixQueue.push(pre + tmpPre);
      } 
      if (preLen === patLen) continue;
      let next = pat.charAt(preLen);

      // Iterate in reverse to evaluate in order
      for (let c = this.#R - 1; c >= 0; c--) {
        const char = this.#alphabet.toChar(c);
        if (next === '.' || next === char) {
          procStack.push([x.next[c], tmpPre + char]);
        }
      }
    }
    return prefixQueue;
  }

  /**
   * This is iterative to prevent the stack
   * from overflowing with a recursive impl.
   * 
   * @param {string} s
   * @returns {string}
   */
  longestPrefixOf(s) {
    /** @type {number} */
    let length = 0;

    /** @type {number} */
    let sLen = s.length;

    /** @type {number} */
    let d = 0;

    /** @type {TrieNode[]} */
    const procStack = [];
    const rootNode = this.#getNode(this.#root, '', 0);
    procStack.push(rootNode);

    while (procStack.length) {
      const x = procStack.pop();
      // search()
      if (x === void 0) continue;
      if (x.val !== void 0) length = d; 
      if (d === sLen) continue;
      const c = this.#alphabet.toIndex(s.charAt(d))
      procStack.push(x.next[c]);
      d++;
    }
    return s.substring(0, length);
  }

  /**
   * 
   * @param {string} key 
   */
  delete(key) {
    this.#root = this.#deleteNode(this.#root, key, 0)
  }

  /**
   * 
   * @param {TrieNode} x 
   * @param {string} key 
   * @param {number} d 
   */
  #deleteNode(x, key, d) {
    if (x === void 0) return x;
    if (d === key.length) {
      x.val = void 0;
    } else {
      const c = this.#alphabet.toIndex(key.charAt(d));
      x.next[c] = this.#deleteNode(x.next[c], key, d + 1);
    }
    if (x.val !== void 0) return x;
    for (let c = 0; c < this.#R; c++) {
      if (x.next[c] !== void 0) return x;
    }
    return undefined;
  }
}

module.exports = TrieST;