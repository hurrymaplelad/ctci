/**
 * @constructor
 * @param {Integer[][]} vec2d
 */
var Vector2D = function(vec2d) {
    this.vec2d = vec2d;
    this.i = 0;
    this.j = 0;
    this._advancePastBlanks();
};


/**
 * @this Vector2D
 * @returns {boolean}
 */
Vector2D.prototype.hasNext = function() {
    return this.i < this.vec2d.length && this.j < this.vec2d[this.i].length;
};

Vector2D.prototype._advancePastBlanks = function() {
    while(this.i < this.vec2d.length && this.j >= this.vec2d[this.i].length) {
        this.i += 1;
        this.j = 0;
    }
}

/**
 * @this Vector2D
 * @returns {integer}
 */
Vector2D.prototype.next = function() {
    let val = this.vec2d[this.i][this.j];
    this.j += 1;
    this._advancePastBlanks();
    return val;
};

/**
 * Your Vector2D will be called like this:
 * var i = new Vector2D(vec2d), a = [];
 * while (i.hasNext()) a.push(i.next());
*/
