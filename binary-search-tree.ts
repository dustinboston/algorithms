class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  inorderTreeWalk(x) {
    if (x !== null) {
      this.inorderTreeWalk(x.left);
      console.log(x.key);
      this.inorderTreeWalk(x.right);
    }
  }

  // O(h)
  search(x, k) {
    if (x === null || k === x.key) {
      return x;
    }

    if (k < x.key) {
      return this.search(x.left, k);
    } else {
      return this.search(x.right, k);
    }
  }

  iterativeSearch(x, k) {
    while (x !== null && k !== x.key) {
      if (k < x.key) {
        x = x.left;
      } else {
        x = x.right;
      }
    }
    return x;
  }

  // O(h)
  minimum(x) {
    while (x.left !== null) {
      x = x.left;
    }
    return x;
  }

  // O(h)
  maximum(x) {
    while (x.right !== null) {
      x = x.right;
    }
    return x;
  }

  successor(x) {
    if (x.right !== null) {
      return this.minimum(x.right);
    }

    let y = x.p;
    while (y !== null && x === y.right) {
      x = y;
      y = y.p;
    }
    return y;
  }

  // O(h)
  insert(z) {
    let y = null;
    let x = this.root;
    while (x !== null) {
      y = x;
      if (z.key < x.key) {
        x = x.left;
      } else {
        x = x.right;
      }
    }
    z.p = y;
    if (y === null) {
      this.root = z;
    } else if (z.key < y.key) {
      y.left = z;
    } else {
      y.right = z;
    }
  }

  delete(z) {
    let x = null;
    let y = null;

    if (z.left === null || z.right === null) {
      y = z;
    } else {
      y = this.successor(z);
    }

    if (y.left !== null) {
      x = y.left;
    } else {
      x = y.right;
    }

    if (x !== null) {
      x.p = y.p;
    }

    if (y.p === null) {
      this.root = x;
    } else if (y === y.p.left) {
      y.p.left = x;
    } else {
      y.p.right = x;
    }

    if (y !== z) {
      z.key = y.key;
    }

    return y;
  }
}

module.exports = BinarySearchTree;
