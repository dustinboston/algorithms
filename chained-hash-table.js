const LinkedList = require('./LinkedList');

class ChainedHashTable {
  constructor() {
    this.T = {};
  }

  insert(x) {
    const h = this.hash(x.key);
    if (!this.T[h]) this.T[h] = new LinkedList();
    this.T[h].insert(x);
  }

  delete(x) {
    const h = this.hash(x.key);
    this.T[h].delete(h);
  }

  search(k) {
    const h = this.hash(k);
    return this.T[h].search(h);
  }

  // Optimizing for a hash table with an average of ~20 nodes
  // and 3 nodes per LinkedList, we use the number 7 because it
  // it is a prime number near 20/3, and it is not divisible
  // by the number 2.
  hash(k) {
    return k % 7;
  }
}

module.exports = ChainedHashTable;
