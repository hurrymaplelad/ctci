/*
Find the median of two sorted arrays in O(log(m+n)) time.

Idea:
   Split each on the middlish element. Are both smaller splits smaller than both larger splits? y: done. n: adjust both splits in the compensating direction, half the remaining length.

Note:
  - This implementation needs a constant-time read-only slice data-structure to reach O(log(m+n)) time.
  - As it is with normal array slice, it's more like O((m+n)log(m+n)) time.
*/

 function average(nums) {
     let total = 0;
     for(let n of nums) {
         total += n;
     }
     return total / nums.length;
 }

 function median(nums) {
     return average(nums.slice(
         Math.ceil(nums.length / 2) - 1,
         Math.floor(nums.length / 2) + 1
     ));
 }

 // Assumes nums.length >= 2
 function medianArrayAndNumber(nums, n) {
    let middle = nums.slice(
        Math.floor(nums.length/2) - 1,
        Math.ceil(nums.length/2) + 1
    );
    middle.push(n);
    middle.sort((x,y) => x - y);
    return median(middle);
 }

/**
* @param {number[]} nums1
* @param {number[]} nums2
* @return {number}
*  [nums1] splits into [small1] [big1], at index i
*  [nums2] splits into [small2] [big2], at index j
*/
var findMedianSortedArrays = function(nums1, nums2) {
    if(nums1.length + nums2.length < 3) return average(nums1.concat(nums2));
    if(!nums1.length || !nums2.length) return median(nums1.concat(nums2));
    if(nums1.length == 1) return medianArrayAndNumber(nums2, nums1[0]);
    if(nums2.length == 1) return medianArrayAndNumber(nums1, nums2[0]);

    // now we now both arrays have length >= 2, so we can split them
    let i = Math.floor(nums1.length / 2);
    let j = Math.ceil(nums2.length / 2);
    let small1 = nums1.slice(0, i), big1 = nums1.slice(i);
    let small2 = nums2.slice(0, j), big2 = nums2.slice(j);
    if(small1[i-1] > big2[0]) {
        // discard shorter of small2, big1 and equivalent
        let shorter = Math.min(small2.length, big1.length);
        return findMedianSortedArrays(nums1.slice(0, -shorter), nums2.slice(shorter));
    }
    if(small2[j-1] > big1[0]) {
        // discard shorter of small1, big2 and equivalent
        let shorter = Math.min(small1.length, big2.length);
        return findMedianSortedArrays(nums1.slice(shorter), nums2.slice(0, -shorter));
    }
    // correctly ordered
    let diff = (small1.length + small2.length) - (big1.length + big2.length);
    let smallestBig = Math.min(big1[0], big2[0]);
    let biggestSmall = Math.max(small1[i-1], small2[j-1]);
    if(diff < 0) { return smallestBig; } // 1 more big
    else if (diff > 0) { return biggestSmall; } // 1 more small
    return average([smallestBig, biggestSmall]); // equal lengths
  };
