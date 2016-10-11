/**
 * O(NK) time, O(1) space
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    let results = [];
    for(let i=0; i+k<=nums.length; i++) {
        results.push(max(nums, i, k));
    }
    return results;
};

function max(nums, i, k) {
   let max = nums[i];
   for(let j=i+1; j<i+k; j++) {
       max = Math.max(nums[j], max);
   }
   return max;
}
