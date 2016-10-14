// Linear time, constant space, detroys newIndicies.

let a = [1,2,3,4,5,6];
let newIndicies = [4,2,5,1,0,3];
const DONE = -1;
function reorder(a, newIndicies) {
  if(!a || !a.length || a.length != newIndicies.length) {
    return a;
  }
  // n passes, one element at a time
  let i = 0;
  function swapFrom(i) {
    let swapIn = a[i];
    let swapOut = null;
    while(newIndicies[i] !== DONE) {
      let newI = newIndicies[i];
      swapOut = a[newI];
      a[newI] = swapIn;
      newIndicies[i] = DONE;
      i = newI;
      swapIn = swapOut;
    }
  }

  for(let j=0; j<a.length; j++) {
    swapFrom(j);
  }

  return a;
}

console.log(reorder(a, newIndicies));
