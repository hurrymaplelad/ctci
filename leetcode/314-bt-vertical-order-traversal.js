/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalOrder = function(root) {
    let cols = [];
    let q = []; // TODO: use a real Queue for O(1) pop front.
    if(root) {
        q.push([root, findLeftmost(root)])
    }
    while(q.length) {
        let [node, x] = q.shift();
        if(!cols[x]) cols[x] = [];
        cols[x].push(node.val);
        if(node.left) q.push([node.left, x-1]);
        if(node.right) q.push([node.right, x+1]);
    }
    return cols;
};

function findLeftmost(node) {
    let leftmost = 0;
    if(!node) return leftmost;
    if(node.left) {
        leftmost = findLeftmost(node.left) + 1;
    }
    if(node.right) {
        leftmost = Math.max(
            leftmost,
            findLeftmost(node.right) - 1
        );
    }
    return leftmost;
}
