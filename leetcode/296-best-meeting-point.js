/**
 * O(MN) time, O(M+N) space for an MxN grid
 * Observations:
 * - x & y distances are independent in manhattan distance.
 * - in one dimension, the best meeting point is the median of the sorted list  
 * @param {number[][]} grid
 * @return {number}
 */
var minTotalDistance = function(grid) {
    let xList = [];
    let yList = [];
    if(!grid || !grid.length || !grid[0].length) return 0;
    for(let x=0; x<grid.length; x++) {
        for(let y=0; y<grid[0].length; y++) {
            if(grid[x][y] === 1) {
                xList.push(x);
            }
        }
    }
    for(let y=0; y<grid[0].length; y++) {
        for(let x=0; x<grid.length; x++) {
            if(grid[x][y] === 1) {
                yList.push(y);
            }
        }
    }
    return medianDistance(xList) + medianDistance(yList);
};

function medianDistance(list) {
    let m = list[Math.floor(list.length / 2)];
    let total = 0;
    for(let value of list) {
        total += Math.abs(m - value);
    }
    return total;
}
