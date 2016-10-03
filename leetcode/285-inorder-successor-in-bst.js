/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 *  4
 * 2   5
 *1 3    6
 *
 * In order:
 *   1 2 3 4 5 6
 *
 * Given 3:
 *   traverse 4 2 3, pop to root, return 4
 */
var inorderSuccessor = function(root, p) {
    let next = null;
    while(root) {
        if(p.val < root.val) {
            // this could be the next larger
            next = root;
            root = root.left;
        } else {
            root = root.right;
        }
    }
    return next;
}
