/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    if(!nums || !nums.length) return 0;
    let maxes = [];
    for(var i=0; i<nums.length; i++) {
        maxes[i] = Math.max(
            maxes[i-1] || 0,
            (maxes[i-2] || 0) + nums[i]
        );
    }
    return maxes[i-1];
};
