/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/**
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */
var merge = function(intervals) {
    if(!intervals || intervals.length < 2) return intervals;
    let byEnd = intervals.slice().sort((i1, i2) => i1.end - i2.end);
    let result = [];
    for(let interval of byEnd) {
        result.push(interval);
        while(collapse(result)) {}
    }
    return result;
};

function collapse(intervals) {
    if(intervals.length  < 2) return false;
    let i2 = intervals.pop();
    let i1 = intervals.pop();
    if(overlap(i1, i2)) {
        intervals.push(mergeTwo(i1, i2));
        return true;
    } else {
        intervals.push(i1, i2);
        return false;
    }
}

function overlap(i1, i2) {
    return (i1 && i2 && i1.start <= i2.end && i2.start <= i1.end);
}

function mergeTwo(i1, i2) {
    return new Interval(
        Math.min(i1.start, i2.start),
        Math.max(i1.end, i2.end)
    );
}
