// Algorithms, 4th Edition

const R = 256;

class TrieNode {
  /* @type {any} */
  #val;
  /* @type {TrieNode[]} */
  #next = Array(R).fill(undefined);

  /**
   * @param {number} c char code
   * @returns {TrieNode}
   */
  getNext(c) {
    return this.#next[c];
  }

  /**
   * @param {TrieNode} node 
   * @param {number} c char code
   */
  setNext(node, c) {
    this.#next[c] = node;
  }

  /**
   * @returns {any}
   */
  getValue() {
    return this.#val;
  }

  /**
   * @param {any} val 
   */
  setVal(val) {
    this.#val = val;
  }
}

class TrieST {
  /* @type {TrieNode} */
  #root;

  /**
   * @param {string} key 
   * @returns {any}
   */
  getValue(key) {
    const x = this.#getNode(this.#root, key, 0);
    if (x === void 0) return;
    return x.getValue();
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
    const c = key.charCodeAt(d);
    return this.#getNode(x.getNext(c), key, d + 1)
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
    if (x === void 0) x = new TrieNode();
    if (d === key.length) { x.setVal(val); return x; }
    // Use dth key char to identify subtrie.
    const c = key.charCodeAt(d);
    const nextNode = this.#putNode(x.getNext(c), key, val, d + 1);
    x.setNext(nextNode, c);
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
      if (x.getValue() !== void 0) cnt++;

      for (let c = R - 1; c >= 0; c--) {
        procStack.push(x.getNext(c));
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
    /* @type {string[]} */
    const prefixQueue = [];

    /* @type {string} */
    const p = pre;

    /* @type {[TrieNode, string][]} */
    const procStack = [];
    const rootNode = this.#getNode(this.#root, p, 0);
    procStack.push([rootNode, p]);

    while (procStack.length) {
      let [x, tmpPre] = procStack.pop();

      // collect()
      if (x === void 0) continue;
      if (x.getValue() !== void 0) {
        prefixQueue.push(pre.length ? tmpPre : p + tmpPre);
      }

      // Iterate in reverse to evaluate in order
      for (let c = R - 1; c >= 0; c--) {
        procStack.push([x.getNext(c), tmpPre + String.fromCharCode(c)]);
      }
    }

    return prefixQueue;
  }
}

module.exports = TrieST;