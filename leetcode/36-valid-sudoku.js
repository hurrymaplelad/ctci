/**
 * @param {character[][]} board
 * @return {boolean}
 * Rules:
 *  Each row has 1-9 just once
 *  Each col has 1-9 just once
 *  Each square has 1-9 just once
 *  We just need to detect dupes
 */
var isValidSudoku = function(board) {
    function isValidRow(y) {
        let v = new Validator();
        for(let x=0; x<9; x++) {
            if(!v.addAndCheck(board[x][y])) {
                return false;
            }
        }
        return true;
    }

    function isValidCol(x) {
        let v = new Validator();
        for(let y=0; y<9; y++) {
            if(!v.addAndCheck(board[x][y])) {
                return false;
            }
        }
        return true;
    }
    function isValidSubgrid(x, y) {
        let v = new Validator();
        for(let dx=0; dx<3; dx++) {
            for(let dy=0; dy<3; dy++) {
                if(!v.addAndCheck(board[x+dx][y+dy])) {
                    return false;
                }
            }
        }
        return true;
    }

    // check cols
    for(let x=0; x<9; x++) {
        if(!isValidCol(x)) return false;
    }
    // check rows
    for(let y=0; y<9; y++) {
        if(!isValidRow(y)) return false;
    }
    // check sub grids
    for(let x=0; x < 9; x+=3) {
        for(y=0; y < 9; y+=3) {
            if(!isValidSubgrid(x, y)) return false;
        }
    }
    return true;
};

class Validator {
    constructor() {
        this.seen = {};
    }

    addAndCheck(x) {
        if(x !== '.' && x in this.seen) {
            return false;
        }
        this.seen[x] = true;
        return true;
    }
}
