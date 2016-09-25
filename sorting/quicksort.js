function quickSort(list) {
  if(!list || list.length < 2) {
    return list;
  }
  let pivotIndex = partition(list);
  return [].concat(
    quickSort(list.slice(0, pivotIndex)),
    list[pivotIndex],
    quickSort(list.slice(pivotIndex + 1, list.length))
  )
}

function partition(list) {
  let pivotIndex = list.length - 1;
  let pivotValue = list[pivotIndex];
  let swapIndex = 0;
  for(let i = 0; i < pivotIndex; i++) {
    if(list[i] < pivotValue) {
      swap(list, i, swapIndex);
      swapIndex += 1;
    }
  }
  swap(list, swapIndex, pivotIndex);
  return swapIndex;
}

function swap(list, i, j) {
  let temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}

console.log(quickSort([5, 1]));
console.log(quickSort([1, 3, 5, 2, 7, 4]));
