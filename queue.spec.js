const assert = require('assert');
const Queue = require('./Queue');

const array = new Array(6);
const q = new Queue(array);

q.enqueue(4);
assert(array[0] === 4, 'enqueued 4');

q.enqueue(2);
assert(array[1] === 2, 'enqueued 2');

q.enqueue(3);
assert(array[2] === 3, 'enqueued 3');

assert(q.dequeue() === 4, 'dequeued 4');

q.enqueue(8);
assert(array[3] === 8, 'enqueued 8');

assert(q.dequeue() === 2, 'dequeued 2');
