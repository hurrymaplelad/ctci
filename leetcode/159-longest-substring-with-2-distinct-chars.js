/**
 * O(N) time, O(1) space.
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function(s) {
    if(s.length < 3) return s.length;
    let lastSeen = {};
    let lo = 0, hi = 1;
    let c1 = s[0];
    while(s[hi] === c1) {
        hi += 1;
        if(hi === s.length) return s.length;
    }
    let c2 = s[hi];
    let maxSoFar = hi - lo + 1;
    lastSeen[c1] = hi - 1;
    lastSeen[c2] = hi;

    for(; hi < s.length; hi++) {
        let c = s[hi];
        if(c === c2) {
            maxSoFar = Math.max(maxSoFar, hi - lo + 1);
        } else if (c === c1) {
            c1 = c2;
            c2 = c;
            maxSoFar = Math.max(maxSoFar, hi - lo + 1);
        } else {
            lo = lastSeen[c1] + 1;
            c1 = c2;
            c2 = c;
        }
        lastSeen[c] = hi;
    }
    return maxSoFar;
};
