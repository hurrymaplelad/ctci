/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var longestConsecutive = function(root) {
    let longestSoFar = 0;

    function walk(node, prevVal, sequenceLength) {
        if(!node) return;
        if(prevVal !== undefined && node.val == prevVal + 1) {
            sequenceLength += 1;
        } else {
            sequenceLength = 1;
        }

        longestSoFar = Math.max(sequenceLength, longestSoFar);

        walk(node.left, node.val, sequenceLength);
        walk(node.right, node.val, sequenceLength);
    }

    walk(root);
    return longestSoFar
};
