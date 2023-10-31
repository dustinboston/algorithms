class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // O(n) time
  search(k) {
    let x = this.head;
    while (x !== null && x.key !== k) {
      x = x.next;
    }
    return x;
  }

  // O(1) time
  insert(x) {
    x.next = this.head;
    if (this.head !== null) {
      this.head.prev = x;
    }
    this.head = x;
    x.prev = null;
  }

  // O(1) time
  delete(x) {
    if (x.prev !== null) {
      x.prev.next = x.next;
    } else {
      this.head = x.next;
    }

    if (x.next !== null) {
      x.next.prev = x.prev;
    }
  }
}

module.exports = LinkedList;
