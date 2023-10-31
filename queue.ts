class Queue {
  constructor(array) {
    this.Q = array;
    this.head = this.tail = 0;
  }

  enqueue(x) {
    this.Q[this.tail] = x;
    if (this.Q[this.tail] === this.Q.length) {
      this.tail = 0;
    } else {
      this.tail += 1;
    }
  }

  dequeue() {
    const x = this.Q[this.head];
    if (this.head === this.Q.length) {
      this.head = 0;
    } else {
      this.head += 1;
    }
    return x;
  }
}

module.exports = Queue;
