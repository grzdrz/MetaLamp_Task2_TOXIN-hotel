/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import Iterator from './iterator';

class LoopedDoublyLinkedList {
  get length() {
    let result = 0;
    for (let item of this) {
      result += 1;
    }
    return result;
  }

  constructor(baseValue) {
    this.initialize(baseValue);
  }

  initialize(baseValue) {
    this.head = {
      next: undefined,
      previous: undefined,
      value: baseValue,
      index: 0,
    };
    this.tail = this.head;

    this.head.next = this.tail;
    this.head.previous = this.tail;
  }

  add(value) {
    const newItem = {
      next: this.tail,
      previous: this.head,
      value,
      index: this.head.index + 1,
    };

    this.head.next = newItem;
    this.head = newItem;
    this.tail.previous = this.head;
  }

  [Symbol.iterator]() {
    return new Iterator(this);
  }
}

export default LoopedDoublyLinkedList;
