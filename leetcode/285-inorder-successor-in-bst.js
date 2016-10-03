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

 Edge cases:
 - found root
 - no right child
 - last right child
 */
var inorderSuccessor = function(root, p) {
    function find(node) {
        if(node === p) {
            return nextInOrder(node.right);
        }
        if(!node) {
            return null;
        }

        let next = null;
        if(p.val < node.val) {
            // left
            next = find(node.left);
            if(!next) {
                next = node;
            }
        } else {
            // right
            next = find(node.right);
        }
        return next;
    }
    return find(root);
};

function nextInOrder(node) {
  return node && (nextInOrder(node.left) || node);
}
