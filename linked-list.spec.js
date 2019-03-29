const assert = require("assert");
const LinkedList = require("./LinkedList");
const Node = require("./Node");

const l = new LinkedList();

l.insert(new Node(3));
const search1 = l.search(3);
assert(search1.key === 3, "search for 3");

const node6 = new Node(6);
l.insert(node6);
const search2 = l.search(6);
assert(search2.key === 6, "search for 6");

l.delete(node6);
assert(l.head.key === 3, "delete node 6");
