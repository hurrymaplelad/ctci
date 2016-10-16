/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    if(!s.length || !t.length || t.length > s.length) return "";
    let required = new CharCounter();
    for(let c of t) {
        required.increment(c);
    }

    let early = 0;
    let seen = new CharCounter();
    let totalRequiredSeen = 0;
    let bestEarly = 0, bestLate = Number.POSITIVE_INFINITY;
    for(let late=0; late < s.length; late++) {
        let c = s[late];
        if(seen.count(c) < required.count(c)) {
            totalRequiredSeen++;
        }
        seen.increment(c);

        // advance early
        while(totalRequiredSeen >= t.length) {
            let earlyC = s[early];
            if(seen.count(earlyC) > required.count(earlyC)) {
                seen.decrement(earlyC);
                early++;
            } else {
                if(late - early < bestLate - bestEarly) {
                    bestEarly = early;
                    bestLate = late;
                }
                break;
            }
        }
    }
    if(bestLate != Number.POSITIVE_INFINITY) {
        return s.slice(bestEarly, bestLate+1);
    } else {
        return '';
    }
};

class CharCounter {
    constructor() {
        this.counts = {};
    }

    count(c) {
        return this.counts[c] || 0;
    }

    increment(c) {
        if(!(c in this.counts)) this.counts[c] = 0;
        this.counts[c]++;
    }

    decrement(c) {
        this.counts[c]--;
    }
}
