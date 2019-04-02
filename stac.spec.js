const assert = require('assert');
const Stack = require('./Stack');

const array = new Array(6);
const s = new Stack(array);

s.push(4);
assert(array[0] === 4, 'pushed 4');

s.push(1);
assert(array[1] === 1, 'pushed 1');

assert(s.pop() === 1, 'popped 1');

s.push(8);
assert(array[1] === 8, 'pushed 8');

assert(s.pop() === 8, 'popped 8');
