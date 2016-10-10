/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function(s, k) {
    let sightings = {}; // maps chars to number of times they occur in s[lo:hi]
    let distinct = k; // number of distinct character slots remaining in s[lo:hi]
    let maxSoFar = 0;
    let lo = 0;

    for(let hi=0; hi < s.length; hi++) {
        let hiC = s[hi];
        if(!sightings[hiC]) {
            sightings[hiC] = 1;
            distinct--;
        } else {
            sightings[hiC]++;
        }
        while(distinct < 0) {
            let loC = s[lo];
            sightings[loC] -= 1;
            if(sightings[loC] === 0) distinct++;
            lo++;
        }
        maxSoFar = Math.max(maxSoFar, hi - lo + 1);
    }
    return maxSoFar;
};
