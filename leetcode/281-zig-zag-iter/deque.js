function * walkArray(arr) {
    for(let el of arr) yield el;
}

function * walk(arrays) {
    // TODO: use a proper deque instead of reversing stacks
    let inStack = arrays.map(walkArray), out = [];
    inStack.reverse();
    while(inStack.length) {
        let arrIter = inStack.pop();
        let {value, done} = arrIter.next();
        if(!done) {
            out.push(arrIter);
            yield value;
        }

        if(!inStack.length) {
            out.reverse();
            inStack = out;
            out = [];
        }
    }
}

/**
 * @constructor
 * @param {Integer[]} v1
 * @param {Integer[]} v1
 */
var ZigzagIterator = function ZigzagIterator(v1, v2) {
    this.iter = walk([v1, v2]);
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
