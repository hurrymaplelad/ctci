/**
 * @param {string} s
 * @return {number}
 * Build up table of ways counts from end
 */
var numDecodings = function(s) {
    s = s.trim();
    if(!s || !s.length) return 0;
    if(!/^[0-9]+$/.test(s)) return 1;

    let waysCounts = [];
    waysCounts[s.length] = 1;
    for(let i=s.length-1; i>=0; i--) {
        ways = 0;
        // 1 number char
        let oneDigit = Number(s[i]);
        if(oneDigit > 0) {
            ways += waysCounts[i+1];
        }
        // 2 number char
        let twoDigit = Number(s.slice(i, i+2));
        if(twoDigit <= 26 && twoDigit > 9) {
            ways += waysCounts[i+2];
        }
        waysCounts[i] = ways;
    }
    return waysCounts[0];
};
