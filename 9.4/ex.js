/*
 List all subsets of a set
*/

// Assumes sets are represented as Arrays.
function listSubsets(set) {
  let subsets = [[]];
  for(let i=0; i<set.length; i++) {
    let el = set[i];
    let boundary = subsets.length;
    for(let j=0; j<boundary; j++) {
      let subset = subsets[j].slice();
      subset.push(el);
      subsets.push(subset);
    }
  }
  return subsets;
}

let set = ['a','b','c','d'];
console.log(listSubsets(set));
console.log(listSubsets(set).length);
