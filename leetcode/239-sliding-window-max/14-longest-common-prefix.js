/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(!strs || !strs.length) return '';
    outer:
    for(var i=0; i<strs[0].length; i++) {
        let c = strs[0][i];
        for(let s of strs) {
            if(i >= s.length || s[i] !== c) {
                break outer;
            }
        }
    }
    return strs[0].slice(0,i);
};
