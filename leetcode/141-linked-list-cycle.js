/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * O(n) time, O(1) space
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let slow = head;
    let fast = head;
    while(fast && fast.next && fast.next.next) {
        if(fast.next === slow || fast.next.next === slow) {
            return true;
        }
        fast = fast.next.next;
        slow = slow.next;
    }
    return false;
};
