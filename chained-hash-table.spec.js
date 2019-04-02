const assert = require('assert');
const ChainedHashTable = require('./chained-hash-table');
const Node = require('./node');

const t = new ChainedHashTable();

for (let i = 1; i <= 20; i++) {
  t.insert(new Node(i));
}

assert(Object.keys(t.T).length === 7, '20 nodes inserted into 7 buckets');

let nodekeys = [];
Object.keys(t.T).forEach(function(h) {
  let x = t.T[h].head;
  while (x) {
    nodekeys.push(x.key);
    x = x.next;
  }
  return x;
});

assert(nodekeys.length === 20, '20 items inserted');
