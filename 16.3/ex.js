/* Dining Philosophers */

class Philosopher {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  eat() {
    if(this.left.lock()) {
      if(!this.right.lock()) {
        this.left.unlock();
        return;
      }
    }

    setTimeout(() => {
      this.left.unlock();
      this.right.unlock();
    }, Math.random() * 10000);
  }

  class Chopstick {
    lock() {
      if(this.locked) {
        return false;
      }
      this.locked = true;
      return true;
    }

    unlock() {
      this.locked = false;
    }
  }
