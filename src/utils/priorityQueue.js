export class PriorityQueue {
  constructor() {
    this.items = [];
  }

  push(item, priority) {
    this.items.push({ item, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  pop() {
    return this.items.shift().item;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
