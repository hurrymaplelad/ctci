/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
var findMissingRanges = function(nums, lower, upper) {
    let missing = [];
    let val = lower;
    let i = 0;
    for(let i=0; i < nums.length; i++) {
        while(i < nums.length - 1 && nums[i] === nums[i+1]) i++; // burn dupes
        if(val === nums[i]) {
            val += 1;
        } else {
            missing.push(makeRange(val, nums[i]));
            val = nums[i] + 1;
        }
    }

    if(val !== upper+1 || (nums.length === 0 &&  val === upper)) {
        missing.push(makeRange(val, upper+1));
    }
    return missing;
};

/*
 Low is inclusive.
 High is exclusive.
*/
function makeRange(lo, hi) {
  if(hi === lo + 1) return lo.toString();
  return `${lo}->${hi-1}`;
}
