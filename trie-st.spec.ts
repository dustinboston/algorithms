const assert = require('assert');
const TrieST = require('./trie-st.js');
const Alphabet = require('./trie-st-alpha.js');

const alpha = Alphabet.LOWERCASE;

function itShouldInsert() {
  const t = new TrieST(alpha);
  const key = 'she sells sea shells by the sea shore';
  key.split(' ').forEach((k, i) => {
    t.put(k, i);
  });

  assert(t.size() === 7, 'Size of trie matches');
}
itShouldInsert();

function itShouldListKeys() {
  const t = new TrieST(alpha);
  const key = 'she sells sea shells by the sea shore';
  key.split(' ').forEach((k, i) => {
    t.put(k, i);
  });

  const actual = t.keys();
  assert(actual.length === 7, 'Number of keys matches')
}
itShouldListKeys();

function itShouldGetValuesByKey() {
  const wordList = [
    ['by', 'b i'],
    ['sea', 's e'], 
    ['sells', 's e l z'], 
    ['she', 'sh e'], 
    ['shells', 'sh e l z'], 
    ['shore', 'sh o r'],
    ['the', '<th'],
  ];

  const t = new TrieST(alpha);
  wordList.forEach(([key, val]) => {
    t.put(key, val);
  });

  const val = t.getValue('she');
}
itShouldGetValuesByKey();

function itShouldGetKeysWithPrefix() {
  const t = new TrieST(alpha);
  const wordList = 'she sells sea shells by the sea shore';
  wordList.split(' ').forEach((k, i) => {
    t.put(k, i);
  });

  const keys = t.keysWithPrefix('sh');
  assert(keys.join(',') === 'she,shells,shore');
}
itShouldGetKeysWithPrefix();

function itShouldMatchKeys() {
  const t = new TrieST(alpha);
  const wordList = 'she sells sea shells by the sea shore';
  wordList.split(' ').forEach((k, i) => {
    t.put(k, i);
  });

  const keys = t.keysThatMatch('sh.');
  assert(keys.join(',') === 'she');
}
itShouldMatchKeys()

function itShouldFindTheLongestPrefixOfAString() {
  const t = new TrieST(alpha);
  const wordList = 'she sells sea shells by the sea shore';
  wordList.split(' ').forEach((k, i) => {
    t.put(k, i);
  });

  const tests = [
    ['she', 'she'],
    ['shell', 'she'],
    ['shellsort', 'shells'],
    ['shelter', 'she']
  ].forEach(([input, expected]) => {
    const actual = t.longestPrefixOf(input);
    assert(actual === expected);
  });
}
itShouldFindTheLongestPrefixOfAString();

function itShouldDeleteAKey() {
  const t = new TrieST(alpha);
  const wordList = 'she sells sea shells by the sea shore';
  wordList.split(' ').forEach((k, i) => {
    t.put(k, i);
  });

  t.delete('shells');

  const keys = t.keysWithPrefix('sh');
  assert(keys.join(',') === 'she,shore');
}
itShouldDeleteAKey();