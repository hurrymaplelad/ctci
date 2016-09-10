/*
 De-dupe a linked list
*/

function dedupe(head) {
  if(!head) return head;
  let values = new Map();
  let node = {next: head};
  while(node.next) {
    if(values.has(node.next.value)) {
      // remove the dupe
      node.next = node.next.next;
    } else {
      values.set(node.next.value, true);
      node = node.next;
    }
  }

  // For testing convenience, wouldn't normally return from a function that
  // mutates its input.
  return head;
}

function listify(arr) {
  let lastNode = null;
  for(let item of arr.reverse()) {
    let node = {value: item, next: lastNode};
    lastNode = node;
  }
  return lastNode;
}

console.log(dedupe(listify([1,2,2,3,4,3,1,5])));
console.log(dedupe(listify([])));
console.log(dedupe(listify([1])));
console.log(dedupe(listify([1,1,1,1])));
