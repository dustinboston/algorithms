const assert = require('assert');
const TernarySearchTrie = require('./ternary-search-trie.js');

function itShouldInsert() {
  const t = new TernarySearchTrie();
  const key = 'she sells sea shells by the sea shore';
  const keys = key.split(' ');
  const uniqueKeys = {};
  keys.forEach((k, i) => {
    uniqueKeys[k] = true;
    t.put(k, i);
  });
  const actual = t.size();
  const expected = Object.keys(uniqueKeys).length;
  assert(actual === expected);
}
itShouldInsert();

function itShouldGetStringsByLongestPrefix() {
  const t = new TernarySearchTrie();
  const key = 'she sells sea shells by the sea shore';
  const keys = key.split(' ');
  keys.forEach((k, i) => {
    t.put(k, i);
  });
  
  [
    ['she', 'she'],
    ['shell', 'she'],
    ['shellsort', 'shells'],
    ['shelter', 'she']
  ].forEach(([input, expected]) => {
    const actual = t.longestPrefixOf(input);
    assert(actual === expected);
  });
}
itShouldGetStringsByLongestPrefix();

function itShouldGetKeys() {
  const t = new TernarySearchTrie();
  const key = 'she sells sea shells by the sea shore';
  const keys = key.split(' ');
  const uniqueKeys = {};
  keys.forEach((k, i) => {
    uniqueKeys[k] = true;
    t.put(k, i);
  });
  const actual = t.keys().join(',');
  const expected = Object.keys(uniqueKeys).sort().join(',');
  assert(actual === expected);
}
itShouldGetKeys();

function itShouldGetKeysWithPrefix() {
  const t = new TernarySearchTrie();
  const wordList = 'she sells sea shells by the sea shore';
  const prefix = 'sh';
  const matches = {};
  wordList.split(' ').forEach((k, i) => {
    if (k.length >= prefix.length && k.startsWith(prefix)) {
      matches[k] = true;
    }
    t.put(k, i);
  });

  const actual = t.keysWithPrefix(prefix).join(',');
  const expected = Object.keys(matches).join(',');
  assert(actual === expected);
}
itShouldGetKeysWithPrefix();

function itShouldMatchKeys() {
  const t = new TernarySearchTrie();
  const wordList = 'she sells sea shells by the sea shore';
  wordList.split(' ').forEach((k, i) => {
    t.put(k, i);
  });

  const pattern = 'sh.';
  const actual = t.keysThatMatch(pattern).join(',');
  const expected = 'she';
  console.log({ actual, expected });
  assert(actual === expected);
}
itShouldMatchKeys()
