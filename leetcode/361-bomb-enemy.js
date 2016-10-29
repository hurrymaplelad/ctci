/**
 * @param {character[][]} grid
 * @return {number}
 */
var maxKilledEnemies = function(grid) {
   if(!grid || !grid.length || !grid[0].length) return 0;

   let max = 0;
   let counts = [];
   for(let row of grid) {
       counts.push(new Array(row.length));
   }

   function increment(r0, c0, r1, c1, diff) {
     for(let r=r0; r<=r1; r++) {
        for(let c=c0; c<=c1; c++) {
           if(grid[r][c] === '0') {
               counts[r][c] = (counts[r][c] || 0) + diff
               max = Math.max(max, counts[r][c]);
           }
        }
     }
   }

   // tabulate rows
   for(let r=0; r<grid.length; r++) {
       let lastWall = -1;
       let enemyCount = 0;
       for(let c=0; c<=grid[r].length; c++) {
           let cell = grid[r][c] || 'W';
           switch(cell) {
               case 'W':
                   increment(r, lastWall+1, r, c-1, enemyCount);
                   lastWall = c;
                   enemyCount = 0;
                   break;
               case 'E':
                   enemyCount++;
                   break;
               default:
                   break;
           }
       }
   }

   // tabulate cols
   for(let c=0; c<grid[0].length; c++) {
       let lastWall = -1;
       let enemyCount = 0;
       for(let r=0; r<=grid.length; r++) {
           let cell = (r < grid.length) ? grid[r][c] : 'W';
           switch(cell) {
               case 'W':
                   increment(lastWall+1, c, r-1, c, enemyCount);
                   lastWall = r;
                   enemyCount = 0;
                   break;
               case 'E':
                   enemyCount++;
                   break;
               default:
                   break;
           }
       }
   }

   return max;
};

// assert.equal(maxKilledEnemies(["0E00","E0WE","0E00"]), 3)
