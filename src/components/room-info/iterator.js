class Iterator {
  constructor(list) {
    this.list = list;
    this.current = this.list.tail;
    this.isDone = false;
  }

  next() {
    const result = {
      done: this.isDone,
      value: this.current,
    };
    this.current = this.current.next;
    this.isDone = this.current === this.list.tail;
    return result;
  }
}

export default Iterator;
