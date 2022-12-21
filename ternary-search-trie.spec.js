const assert = require('assert');
const TernarySearchTrie = require('./ternary-search-trie.js');

function itShouldInsert() {
  const t = new TernarySearchTrie();

  const key = 'she sells sea shells by the sea shore';
  const keys = key.split(' ');
  keys.forEach((k, i) => {
    t.put(k, i);
  });

  assert(t.size() === keys.length);
}
itShouldInsert();