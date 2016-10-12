/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let seenCount = 0;
    let result = null;
    function walk(root) {
        if(!root || seenCount >= k) return;
        walk(root.left);
        seenCount += 1;
        if(seenCount === k) result = root.val;
        walk(root.right);
    }
    walk(root);
    return result;
};
