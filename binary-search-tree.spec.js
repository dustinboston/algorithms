const assert = require('assert');
const BinarySearchTree = require('./binary-search-tree');
const Node = require('./binary-search-tree-node');

const b = new BinarySearchTree();

const n2 = new Node(2);
const n3 = new Node(3);
const n8 = new Node(8);

b.insert(n3);
b.insert(n8);
b.insert(n2);

assert(b.root === n3, 'node3 inserted as root');
assert(b.root.left === n2, 'node2 inserted left of 3');
assert(b.root.right === n8, 'node8 inserted right of 3');

const n7 = new Node(7);
b.insert(n7);
assert(b.root.right.left === n7, 'n7 should be inserted before n8');
// b.inorderTreeWalk(b.root);

assert(b.search(b.root, 8) === n8, 'search should return n8');
assert(
  b.iterativeSearch(b.root, 8) === n8,
  'iterative search should return n8'
);

assert(b.minimum(b.root) === n2, 'minimum should be 2');
assert(b.maximum(b.root) === n8, 'maximum should be 8');

b.delete(n7);
assert(b.search(b.root, 7) === null, 'n7 should be deleted');
// b.inorderTreeWalk(b.root);

const n1 = new Node(1);
b.insert(n1);
b.delete(n2);
assert(b.search(b.root, 2) === null, 'n2 should be deleted');
