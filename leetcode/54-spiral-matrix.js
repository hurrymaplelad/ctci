/**
Given the following matrix:

[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]

You should return [1,2,3,6,9,8,7,4,5].

 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if(matrix.length < 1 || matrix[0].length < 1) return [];
    let h = matrix.length;
    let w = matrix[0].length;
    let cycles = Math.floor(Math.min(w, h)/2);
    let results = [];
    function sliceMatrix(x0, x1, y0, y1) {
        let rows = matrix
            .slice(y0, y1)
            .map((row) => row.slice(x0, x1));
        return [].concat(...rows);
    }
    let i;
    for(i=0; i<cycles; i++) {
        // East
        results.push(sliceMatrix(i, w-i-1, i, i+1));
        // South
        results.push(sliceMatrix(w-i-1, w-i, i, h-i-1));
        // West
        results.push(sliceMatrix(i+1, w-i, h-i-1, h-i).reverse());
        // North
        results.push(sliceMatrix(i, i+1, i+1, h-i).reverse());
    }
    // Add center path
    if(Math.min(w,h) % 2 === 1) {
        results.push(sliceMatrix(i, w-i, i, h-i));
    }
    return [].concat(...results);
};
