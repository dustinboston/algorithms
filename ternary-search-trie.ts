/**
 * Ternary Search Trie (TST) from Algorithms, 4th Edition
 */

class TernarySearchTrieNode {

  c = void 0;

  /** @type {TernarySearchTrieNode} */
  left = void 0;

  /** @type {TernarySearchTrieNode} */
  mid = void 0;

  /** @type {TernarySearchTrieNode} */
  right = void 0;

  /** @type {any} */
  val = void 0;
}

class TernarySearchTrie {
  /** @type {number} */
  #n = 0;

  /** @type {TernarySearchTrieNode} */
  #root;

  size() {
    return this.#n;
  }

  /**
   * 
   * @param {string} key 
   * @returns {boolean}
   */
  contains(key) {
    if (!key) throw new Error('A key is required');
    return this.getValue(key) !== void 0;
  }

  /**
   * @param {string} key 
   * @returns {any}
   */
  getValue(key) {
    if (!key || typeof key !== 'string') {
      throw new Error('A string key is required');
    }
    const x = this.#getNode(this.#root, key, 0);
    if (x === void 0) return;
    return x.val;
  }

  /**
   * 
   * @param {TernarySearchTrieNode} x 
   * @param {string} key 
   * @param {number} d 
   * @returns {TernarySearchTrieNode}
   */
  #getNode(x, key, d) {
    if (x === void 0) return;
    if (!key) throw new Error('A key is required');
    const c = key.charCodeAt(d);
    const xc = x.c.charCodeAt(0);
    if (c < xc) { 
      return this.#getNode(x.left, key, d);
    } else if (c > xc) {
      return this.#getNode(x.right, key, d);
    } else if (d < key.length - 1) {
      return this.#getNode(x.mid, key, d + 1);
    } else {
      return x;
    }
  }

  /**
   * 
   * @param {string} key 
   * @param {any} val 
   */
  put(key, val) {
    if (key === void 0) throw new Error('A key is required');
    if (!this.contains(key)) {
      this.#n += 1;
    } else if (val === void 0) {
      this.#n -= 1;
    }
    this.#root = this.#putNode(this.#root, key ,val, 0);
  }

  /**
   * 
   * @param {TernarySearchTrieNode} x 
   * @param {string} key 
   * @param {any} val 
   * @param {number} d 
   */
  #putNode(x, key, val, d) {
    if (x === void 0) {
      x = new TernarySearchTrieNode();
      x.c = key.charAt(d);
    }

    const c = key.charCodeAt(d);
    const xc = x.c.charCodeAt(0);
    if (c < xc) { 
      x.left = this.#putNode(x.left, key, val, d);
    } else if (c > xc) {
      x.right = this.#putNode(x.right, key, val, d);
    } else if (d < key.length - 1) {
      x.mid = this.#putNode(x.mid, key, val, d + 1);
    } else {
      x.val = val;
    }
    return x;
  }

  /**
   * 
   * @param {string} query 
   * @returns {string}
   */
  longestPrefixOf(query) {
    if (query === void 0) throw new Error('A query is required');
    if (query.length === 0) return;

    let length = 0;
    let x = this.#root;

    let i = 0;
    while (x !== void 0 && i < query.length) {
      const c = query.charCodeAt(i);
      const xc = x.c.charCodeAt(0);
      if (c < xc) { 
        x = x.left;
      } else if (c > xc) {
        x = x.right;
      } else {
        i++;
        if (x.val !== void 0) length = i;
        x = x.mid;
      }
    }
    return query.substring(0, length);
  }

  /**
   * 
   * @returns {string[]}
   */
  keys() {
    /** @type {string[]} */
    const q = [];
    this.#collectKeys(this.#root, '', q);
    return q;
  }

  /**
   * 
   * @param {string} prefix 
   * @returns {string[]}
   */
  keysWithPrefix(prefix) {
    if (!prefix || typeof prefix !== 'string') {
      throw new Error('A prefix string is required.')
    }
    /** @type {string[]} */
    const q = [];
    let x = this.#getNode(this.#root, prefix, 0);
    if (x === void 0) return q;
    if (x.val !== void 0) q.push(prefix);
    this.#collectKeys(x.mid, prefix, q);
    return q;
  }

  /**
   * 
   * @param {TernarySearchTrieNode} x 
   * @param {string} pre 
   * @param {string[]} q
   */
  #collectKeys(x, pre, q) {
    if (x === void 0) return;
    this.#collectKeys(x.left, pre, q);
    if (x.val !== void 0) q.push(pre + x.c);
    pre += x.c;
    this.#collectKeys(x.mid, pre, q);
    pre = pre.substring(0, pre.length - 1);
    this.#collectKeys(x.right, pre, q);
  }

  /**
   * 
   * @param {string} pat 
   * @returns {string[]} Matches
   */
  keysThatMatch(pat) {
    /** @type {string[]} */
    const q = [];
    this.#collectKeysThatMatch(this.#root, '', 0, pat, q);
    return q;
  }

  /**
   * Match keys with a wildcard (.)
   * Doesn't match anything longer than the pattern
   * @param {TernarySearchTrie} x 
   * @param {string} prefix 
   * @param {number} i 
   * @param {string} pattern 
   * @param {string[]} q Matches 
   */
  #collectKeysThatMatch(x, prefix, i, pattern, q) {
    if (x === void 0) return;

    const patLen = pattern.length - 1;
    const c = pattern.charAt(i);
    const cCode = c.charCodeAt(0);
    const xc = x.c;
    const xcCode = xc.charCodeAt(0);

    if (c === '.' || cCode < xcCode) {
      this.#collectKeysThatMatch(x.left, prefix, i, pattern, q);
    }

    if (c === '.' || cCode === xcCode) {
      if (i === patLen && x.val !== void 0) {
        q.push(prefix + xc);
      }

      if (i < patLen) {
        prefix += xc;
        this.#collectKeysThatMatch(x.mid, prefix, i + 1, pattern, q);
        prefix = prefix.substring(0, prefix.length - 1);
      }
    }

    if (c === '.' || cCode > xcCode) {
      this.#collectKeysThatMatch(x.right, prefix, i, pattern, q);
    }
  }
}

module.exports = TernarySearchTrie;