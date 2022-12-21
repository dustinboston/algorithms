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
    const c = key.charAt(d);
    if (c < x.c) { 
      return this.#getNode(x.left, key, d);
    } else if (c > x.c) {
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
    if (!key) throw new Error('A key is required');
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
    const c = key.charAt(d);
    if (x === void 0) {
      x = new TernarySearchTrieNode();
      x.c = c;
    }
    if (c < x.c) { 
      x.left = this.#putNode(x.left, key, val, d);
    } else if (c > x.c) {
      return this.#putNode(x.right, key, val, d);
    } else if (d < key.length - 1) {
      return this.#putNode(x.mid, key, val, d + 1);
    } else {
      return x;
    }

  }

}

module.exports = TernarySearchTrie;