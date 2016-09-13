/*
 Count number of paths from 0,0 to x,y in an x by y grid.
*/
// Recursive
function countPaths(x,y) {
  if(x+y == 0) {
    return 0;
  }
  if(x == 0 || y == 0) {
    return 1;
  }
  return countPaths(x-1, y) + countPaths(x, y-1);
}

// O(2^(x+y)) time and space, depth x+y, 2 choices at each depth
console.log(countPaths(3,2))

// Dynamic Programming
// O(xy) time and space
function countPathsFaster(x,y) {
  // initialize 2d cache
  let pathCounts = new Array(x+1);
  for(let i=0; i<x+1; i++) {
    pathCounts[i] = new Array(y+1);
  }

  for(let xi=0; xi<=x; xi++) {
    for(let yi=0; yi<=y; yi++) {
      if(xi == 0 || yi == 0) {
        pathCounts[xi][yi] = 1;
      } else {
        pathCounts[xi][yi] = pathCounts[xi-1][yi] + pathCounts[xi][yi-1];
      }
    }
  }
  return pathCounts[x][y];
}

console.log(countPathsFaster(30,20))
