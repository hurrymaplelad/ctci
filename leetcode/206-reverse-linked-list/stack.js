/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if(!head) return null;
    let nodes = [];
    let node = head;
    while(node) {
        nodes.push(node);
        node = node.next;
    }

    head = nodes.pop();
    node = head;
    while(nodes.length) {
        let next = nodes.pop();
        node.next = next;
        node = next;
    }
    node.next = null;
    return head;
};
