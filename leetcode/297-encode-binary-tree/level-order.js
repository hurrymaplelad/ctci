/**
 * This solution encodes a level-order traversal of the
 * complete binary tree.  All missing nodes encoded as '_'.
 * Doesn't work for depth >20ish sparse trees.
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

 function or(x, y) {
     return x || y;
 }

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
const NULL = '_';

var serialize = function(root) {
    let values = [];
    let pl = [];
    let l = [root];
    while(l.map(Boolean).reduce(or)) {
        values.push(...l.map((n) => n ? n.val : null));
        pl = l;
        l = [];
        for(let node of pl) {
            if(!node) {
                // two null children
                l.push(null, null);
            } else {
                l.push(node.left, node.right);
            }
        }
    }

    return values.map((v) => (v === null) ? NULL : v).join(' ');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    let nodes = data
        .split(' ')
        .map((str) => {
            if(str === NULL || str === '') { return null }
            return new TreeNode(Number(str));
        });

    for(let i=0; 2*i+2<nodes.length; i++) {
        let n = nodes[i];
        if(!n) {continue;}
        n.left = nodes[2*i+1];
        n.right = nodes[2*i+2];
    }
    return nodes[0];
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
