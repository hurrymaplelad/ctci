/*
 Find the k-to-last element of a singly linked list.
*/

function findKToLast(head, k) {
  let fast = head;
  let slow = head;

  // advance fast by k
  for(let i=0; i<k; i++) {
    if(!fast || !fast.next) {
      return null;
    }
    fast = fast.next;
  }

  // advance fast and slow together
  while(fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  return slow;
}

function listify(arr) {
  let lastNode = null;
  for(let item of arr.reverse()) {
    let node = {value: item, next: lastNode};
    lastNode = node;
  }
  return lastNode;
}

console.log(findKToLast(listify([1,2,3,4]), 0))
console.log(findKToLast(listify([1,2,3,4]), 1))
console.log(findKToLast(listify([1,2,3]), 3))
console.log(findKToLast(listify([1,2,3]), 2))
