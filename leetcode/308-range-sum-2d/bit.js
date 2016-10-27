/** Use a 2d binary index tree for log(n)^2 updates and
queries.
*/

/*
 * Ex: 0110 -> 0010
 */
function lsbMask(x) {
  return x & -x;
}

function tailMask(x) {
  return lsbMask(x) << 1;
}

function isRightChild(x) {
  return (x & tailMask(x)) > 0;
}

/*
 * Returns the integer encoding the input bit path
 * without the last bit.
 * Ex: path 0101 (lrlr) encodes as 010110
 *     one step back is encoded as 010100
 *     another step back is        011000
 */
function shortenBitPath(x) {
  return (
    x - lsbMask(x) // clear lsb
    | tailMask(x)  // move lsb up one
  );
}

/**
 * Encoding a binary tree in an array using bit paths
 * is simplest with indicies starting at 1. We offset
 * all path operations by -1 to save space.
 */
class BITree {
  constructor (sizes, dimension=0) {
    let size = sizes[dimension];
    // next larger power of 2
    let k = Math.ceil(Math.log(size + 1) / Math.log(2));
    // index into vectors
    this.dimension = dimension;
    this.isLastDimension = (dimension === sizes.length - 1);
    // exclusive
    this.indexCap = (1 << k) - 1;
    // index of the root of the tree
    this.rootIndex = (1 << (k-1)) - 1;
    // holds the next dimesion of sums, or
    // the cumulative values for the last dimension.
    this.cumulative = new Array(this.indexCap);

    for(let i=0; i<this.indexCap; i++) {
      this.cumulative[i] = (this.isLastDimension ? 0 :
        new BITree(sizes, dimension+1)
     );
    }
  }

  /**
   * Returns the cumulative total of values through index i.
   */
  get(vector) {
    let i = vector[this.dimension];
    let total = 0;
    while(i+1) {
      let partial = (this.isLastDimension ?
        this.cumulative[i] :
        // recurse into the next dimension
        this.cumulative[i].get(vector)
      );
      total += partial;
      // (i + 1) - lsbMask(i + 1) - 1
      i -= lsbMask(i+1);
    }
    return total;
  }

  update(vector, diff) {
    let i = vector[this.dimension];
    let shouldAccumulate = true;
    // Propagate up the tree, applying the diff
    // whenever we came from a left child
    while(i < this.indexCap) {
      if(!shouldAccumulate){
        // no op
      } else if(this.isLastDimension) {
          this.cumulative[i] += diff;
      } else {
          this.cumulative[i].update(vector, diff);
      }
      shouldAccumulate = !isRightChild(i+1);
      i = shortenBitPath(i+1) - 1;
    }
  }

  toString() {
    return this.cumulative.map((x) => x.toString());
  }
}

/**
 * @constructor
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
    if(!matrix || !matrix.length) return;
    this.matrix = matrix;
    let sizes = [matrix.length, matrix[0].length];
    this.biTree = new BITree(sizes);
    for(let r=0; r<matrix.length; r++) {
      let row = matrix[r];
      for(let c=0; c<row.length; c++) {
        this.biTree.update([r, c], row[c]);
      }
    }
};

/**
 * @param {number} row
 * @param {number} col
 * @param {number} val
 * @return {void}
 */
NumMatrix.prototype.update = function(row, col, val) {
  this.biTree.update([row, col], val - this.matrix[row][col]);
  this.matrix[row][col] = val;
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    return (
      this.biTree.get([row2, col2])
      - this.biTree.get([row1-1, col2])
      - this.biTree.get([row2, col1-1])
      + this.biTree.get([row1-1, col1-1])
    );
};


/**
 * Your NumMatrix object will be instantiated and called as such:
 * var numMatrix = new NumMatrix(matrix);
 * numMatrix.sumRegion(0, 1, 2, 3);
 * numMatrix.update(1, 1, 10);
 * numMatrix.sumRegion(1, 2, 3, 4);
 */
let matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
]
var numMatrix = new NumMatrix(matrix);
console.log(numMatrix.biTree.toString());
// console.log(numMatrix.sumRegion(0, 1, 1, 2), 4);
console.log(numMatrix.sumRegion(2, 1, 4, 3), 8);
numMatrix.update(3, 2, 2);
console.log(numMatrix.sumRegion(2, 1, 4, 3), 10);
