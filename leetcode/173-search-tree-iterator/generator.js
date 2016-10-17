/**
 * Definition for binary tree
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

function * walk(node) {
    if(!node) return;
    console.log('w', node.val)
    if(node.left) {
        yield * walk(node.left);
    }
    yield node.val;
    if(node.right) {
        yield * walk(node.right);
    }
}

/**
 * @constructor
 * @param {TreeNode} root - root of the binary search tree
 */
var BSTIterator = function(root) {
    this.gen = walk(root);
    this.next(); // prime this.nextVal;
};


/**
 * @this BSTIterator
 * @returns {boolean} - whether we have a next smallest number
 */
BSTIterator.prototype.hasNext = function() {
    return this.nextVal != null;
};

/**
 * @this BSTIterator
 * @returns {number} - the next smallest number
 */
BSTIterator.prototype.next = function() {
  let val = this.nextVal;
  this.nextVal = this.gen.next().value;
  return val;
};

/**
 * Your BSTIterator will be called like this:
 * var i = new BSTIterator(root), a = [];
 * while (i.hasNext()) a.push(i.next());
*/
