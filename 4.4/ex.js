/*
 Given a binary tree, return linked lists
 of nodes at each level of depth.
*/

function listNodesByDepth(root) {
  let lists = [];
  if(!root) {
    return lists;
  }

  let list = new List();
  list.append(root);
  while(!list.isEmpty()){
    lists.push(list);
    let children = new List();
    for(let {left, right} of list) {
      if(left) {
        children.append(left);
      }
      if(right) {
        children.append(right);
      }
    }
    list = children;
  }
  return list;
}

class List {
  append(value) {
    let node = new Node(value);
    if(!this.tail) {
      this.tail = node;
      this.head = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  isEmpty() {
    return !this.head;
  }

  *[Symbol.iterator]() {
    let node = this.head;
    while(node) {
      yield node;
      node = node.next;
    }
  }
}

class Node {
  constructor(value) {
    this.value = value;
  }
}
