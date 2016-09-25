function mergeSort(list) {
  if(!list || list.length < 2) {
    return list;
  }
  let mid = Math.ceil(list.length/2);
  let left = list.slice(0, mid);
  let right = list.slice(mid, list.length);
  return merge(
    mergeSort(left),
    mergeSort(right)
  );
}

function merge(left, right) {
  let i = 0, j = 0;
  let results = [];
  while(i < left.length && j < right.length) {
    if(left[i] < right[j]) {
      results.push(left[i]);
      i += 1;
    } else {
      results.push(right[j]);
      j += 1;
    }
  }
  while(i < left.length) {
    results.push(left[i]);
    i += 1;
  }
  while(j < right.length) {
    results.push(right[j]);
    j += 1;
  }
  return results;
}

console.log(mergeSort([1,5,3,98,3,2432,0]));
