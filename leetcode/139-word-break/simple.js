/**
 * Memoize, growing substrings from the end.
 * @param {string} s
 * @param {set<string>} wordDict
 *   Note: wordDict is a Set object, see:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    let canBreakAtN = [];
    canBreakAtN[s.length] = true;
    // check if substring i,j is in the dict, and the remaining string can be broken
    for(let i=s.length-1; i>=0; i--) {
        for(let j=i+1; j<=s.length; j++) {
            canBreakAtN[i] = false;
            // TODO: use RO constant time slice data structure here
            if(wordDict.has(s.slice(i,j)) && canBreakAtN[j]) {
                canBreakAtN[i] = true;
                break;
            }
        }
    }
    return canBreakAtN[0];
};
