/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    let results = [[]];
    nums = nums.slice();

    for(let i=0; i<nums.length; i++) {
        let n = nums[i];
        let toAdd = results.slice();
        for(let s of toAdd) {
            let s2 = s.slice();
            s2.push(n);
            results.push(s2);
        }
    }
    return results;
};
