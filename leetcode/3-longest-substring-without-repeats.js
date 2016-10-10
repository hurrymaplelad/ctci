/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if(s.length < 2) return s.length;
    let maxSoFar = 1;
    let lastSeen = {};
    let lo = 0;
    for(let hi = 0; hi < s.length; hi++) {
        let c = s[hi];
        if(c in lastSeen && lastSeen[c] >= lo) {
            lo = lastSeen[c] + 1;
        } else {
            maxSoFar = Math.max(maxSoFar, hi - lo + 1);
        }
        lastSeen[c] = hi;
    }
    return maxSoFar;
};
