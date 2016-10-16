/**
 * Inspired by https://discuss.leetcode.com/topic/63299/python-6-lines-bit-by-bit
 * @param {number[]} nums
 * @return {number}
 */
var findMaximumXOR = function(nums) {
    let max = 0;
    for(let i=31; i>=0; i--) {
        max = max << 1;
        let prefixSet = new Set(nums.map(n => n >>> i));
        for(let p of prefixSet) {
            // Are there two prefixes that XOR to max with another 1?
            let complement = (max|1) ^ p;
            if(prefixSet.has(complement)) {
                max = max|1;
                break;
            }
        }
    }
    return max;
}
