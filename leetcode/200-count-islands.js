/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if(!grid || !grid.length) return 0;
    let count = 0;
    let width = grid.length;
    let height = grid[0].length;

    function mark(x, y) {
        if(x < 0 || x >= width || y < 0 || y >= height || grid[x][y] === '0') return;
        grid[x][y] = '0';
        mark(x+1, y);
        mark(x-1, y);
        mark(x, y+1);
        mark(x, y-1);
    }

    for(let x=0; x<grid.length; x++) {
        for(let y=0; y<grid[0].length; y++) {
            if(grid[x][y] === '1') {
                count++;
                mark(x,y);
            }
        }
    }
    return count;
};
