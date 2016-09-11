/*
  Implement a stack using 2 queues
*/

class MyQueue {
  constructor() {
    this.inStack = new Stack();
    this.outStack = new Stack();
  }

  enqueue(item) {
    this.inStack.push(item);
  }

  dequeue() {
    if(this.outStack.isEmpty()) {
      while(let x = this.inStack.pop()) {
        this.outStack.push(x);
      }
    }
    return this.outStack.pop();
  }
}
