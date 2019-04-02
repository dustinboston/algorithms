class Stack {
  constructor(array) {
    this.S = array;
    this.top = -1;
  }

  stackEmpty() {
    return this.S[this.top] === -1 ? true : false;
  }

  push(x) {
    this.top += 1;
    this.S[this.top] = x;
  }

  pop() {
    if (this.stackEmpty()) {
      throw new Error('underflow');
    } else {
      this.top -= 1;
      return this.S[this.top + 1];
    }
  }
}

module.exports = Stack;
