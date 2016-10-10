/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
const DOWN = 1;
const UP = -1;
var convert = function(s, numRows) {
    if(numRows < 1) return undefined;
    if(numRows === 1) return s;
    let direction = DOWN;
    let row = 0;
    let rows = [];
    for(let i=0; i<numRows; i++) rows.push([]);
    for(let c of s) {
      rows[row].push(c);
      if(row === numRows - 1 && direction === DOWN) {
          direction = UP;
      } else if(row === 0 && direction === UP) {
          direction = DOWN;
      }
      row += direction;
    }
    return [].concat(...rows).join('');
};
