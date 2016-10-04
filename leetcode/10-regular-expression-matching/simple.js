/**
 * This solution has no optimizations
 * and will work pretty hard for its stars.
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
   if(!s && !p) return true;
   if(!p) return false;
   if(p.length == 1) {
       if(s.length != 1) return false;
       return charEquals(s, p);
   }
   if(p[1] == '*') {
       // n uses
       let i=0;
       while(i < s.length && charEquals(s[i], p[0])) {
           if(isMatch(s.slice(i+1), p.slice(2))) {
               return true;
           }
           i++;
       }
       // 0 uses
       return isMatch(s, p.slice(2));

   } else {
       // Consume one character
       if(!s) return false;
       return charEquals(s[0], p[0]) && isMatch(s.slice(1), p.slice(1));
   }
};

function charEquals(c, p) {
    switch(p) {
      case '.': return true;
      default: return p === c;
    }
}
