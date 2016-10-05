/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let sentinel = new ListNode();
    let tail = sentinel;
    function pushDigit(n) {
        tail.next = new ListNode(n);
        tail = tail.next;
    }

    let carry = 0;
    while(l1 && l2) {
        let sum = l1.val + l2.val + carry;
        pushDigit(sum % 10);
        carry = Math.floor(sum / 10);
        l1 = l1.next;
        l2 = l2.next;
    }
    let rest = l1 || l2;
    while(rest) {
        let sum = rest.val + carry;
        pushDigit(sum % 10);
        carry = Math.floor(sum / 10);
        rest = rest.next;
    }
    if(carry) {
        pushDigit(carry);
    }
    return sentinel.next;
};
