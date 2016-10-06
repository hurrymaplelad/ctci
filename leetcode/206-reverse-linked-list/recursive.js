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
    if(!(head && head.next)) return head;
    let tail = head.next;
    let newHead = reverseList(head.next);
    tail.next = head;
    head.next = null;
    return newHead;
};
