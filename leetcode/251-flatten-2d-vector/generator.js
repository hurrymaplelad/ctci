function * walk(arr) {
  for(let a2 of arr) {
      for(let el of a2) {
          yield el;
      }
  }
}


/**
 * @constructor
 * @param {Integer[][]} vec2d
 */
var Vector2D = function(vec2d) {
    this.iterator = walk(vec2d);
    this.nextObj = this.iterator.next();
};


/**
 * @this Vector2D
 * @returns {boolean}
 */
Vector2D.prototype.hasNext = function() {
    return !this.nextObj.done;
};

/**
 * @this Vector2D
 * @returns {integer}
 */
Vector2D.prototype.next = function() {
    let val = this.nextObj.value;
    this.nextObj = this.iterator.next();
    return val;
};

/**
 * Your Vector2D will be called like this:
 * var i = new Vector2D(vec2d), a = [];
 * while (i.hasNext()) a.push(i.next());
*/
