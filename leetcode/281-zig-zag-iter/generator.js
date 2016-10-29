function * walk(v1, v2) {
    let i=0, j=0;
    while(i < v1.length || j < v2.length) {
        if(i < v1.length) yield v1[i++];
        if(j < v2.length) yield v2[j++];
    }
}

/**
 * @constructor
 * @param {Integer[]} v1
 * @param {Integer[]} v1
 */
var ZigzagIterator = function ZigzagIterator(v1, v2) {
    this.iter = walk(v1, v2);
    this._next = this.iter.next();
};


/**
 * @this ZigzagIterator
 * @returns {boolean}
 */
ZigzagIterator.prototype.hasNext = function hasNext() {
    return !this._next.done;
};

/**
 * @this ZigzagIterator
 * @returns {integer}
 */
ZigzagIterator.prototype.next = function next() {
    let value = this._next.value;
    this._next = this.iter.next();
    return value;
};

/**
 * Your ZigzagIterator will be called like this:
 * var i = new ZigzagIterator(v1, v2), a = [];
 * while (i.hasNext()) a.push(i.next());
*/
