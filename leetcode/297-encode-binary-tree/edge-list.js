/**
 * This solution encodes a binary tree as a list of edges,
 * plus the root node. It assigns each node a unique id to
 * handle duplicate values. This representation can efficiently handle
 * a deep sparse tree.
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    let edges = [];
    let id=0;
    let idMap = new Map();
    if(root) {
        // first number is root value in case there are no edges
        idMap.set(root, id++);
        edges.push(`${idMap.get(root)}:${root.val}`);
    }

    function serEdge(parent, child, left) {
        idMap.set(child, id++);
        edges.push(`${idMap.get(parent)}:${idMap.get(child)}:${child.val}:${left ? 1 : 0}`);
    }

    function walk(node) {
        if(!node) {return;}
        if(node.left) { serEdge(node, node.left, true); }
        walk(node.left);
        if(node.right) { serEdge(node, node.right, false); }
        walk(node.right);
    }
    walk(root);
    return edges.join(' ');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if(!data) { return null; }
    let edges = data.split(' ').map((str) => str.split(':').map(Number));

    let nodeMap = {};
    function createNode(id, value) {
        let node = new TreeNode(value);
        nodeMap[id] = node;
        return node;
    }

    let [rootId, rootVal] = edges.shift();
    let root = createNode(rootId, rootVal);

    for(let [parentId, childId, childVal, side] of edges) {
        let pn = nodeMap[parentId];
        let cn = createNode(childId, childVal);
        if(side) {
            pn.left = cn;
        } else {
            pn.right = cn;
        }
    }

    return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
