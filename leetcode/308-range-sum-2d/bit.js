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
 * Ex: path 0101 encodes as        010110
 *     one step back is encoded as 010100
 *     another step back is        011000
 */
function reducePath(x) {
  return (
    x - lsbMask(x) // clear lsb
    | tailMask(x)  // move lsb up one
  );
}

class BITree {
  constructor (sizes, idx=0) {
    let size = sizes[idx];
    // next larger power of 2
    let k = Math.ceil(Math.log(size + 1) / Math.log(2));
    this.maxIndex = (1 << k) - 1;
    this.rootIndex = 1 << (k-1);
    this.cumulative = new Array(2 * size);

    for(let i=1; i<=this.maxIndex; i++) {
      this.cumulative[i] = ((idx < sizes.length - 1) ?
        new BITree(sizes, idx+1) :
        0
     );
    }

  }

  /**
   * Returns the cumulative total of values through index i.
   */
  get(vector, idx=0) {
    let i = vector[idx];
    let lastDimension = (idx === vector.length - 1);
    let total = 0;
    while(i) {
      let partial = (lastDimension ?
        this.cumulative[i] :
        // recurse into the next dimension
        this.cumulative[i].get(vector, idx+1)
      );
      total += partial;
      i -= lsbMask(i);
    }
    return total;
  }

  update(vector, diff, idx=0) {
    let i = vector[idx];
    let lastDimension = (idx === vector.length - 1);
    let shouldAccumulate = true;
    while(i && i <= this.maxIndex) {
      if(shouldAccumulate){
        if(lastDimension) {
          this.cumulative[i] += diff;
        } else {
          this.cumulative[i].update(vector, diff, idx+1);
        }
      }
      shouldAccumulate = !isRightChild(i);
      i = reducePath(i);
    }
  }

  toString() {
    // return this.cumulative.map((x) => x.toString());
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
        this.biTree.update([r+1, c+1], row[c]);
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
  this.biTree.update([row+1, col+1], val - this.matrix[row][col]);
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
      this.biTree.get([row2+1, col2+1])
      - this.biTree.get([row1, col2+1])
      - this.biTree.get([row2+1, col1])
      + this.biTree.get([row1, col1])
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
