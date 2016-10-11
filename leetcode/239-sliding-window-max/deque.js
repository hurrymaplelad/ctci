/**
 * O(n) time and space.
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    let results = [];
    let d = []; // Approximate a real deque with an Array. PopFront will suffer.

    for(let i=0; i < nums.length; i++) {
        let n = nums[i];

        // better than best? forget the rest
        if(d.length && n > d[0]) { d = []; }

        // better than worst? replace the end
        while(d.length && (
            (n > d[d.length-1].val) ||
            (d[d.length-1].i <= i - k)
        )) { d.pop(); }

        // expire bests
        while(d.length && d[0].i <= i - k) { d.shift(); }

        d.push({val: n, i});

        if(i >= k-1) {
            results.push(d[0].val);
        }
    }
    return results;
};
