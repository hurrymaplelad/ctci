/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function(words, maxWidth) {
    let lines = [];
    let i = 0;

    while(i < words.length) {
        let lineWidth = 0;
        let line = [];

        // grab a line's worth of words
        while(i < words.length && (
            lineWidth + // words already added
            line.length + // at least one space between each word pair
            words[i].length // one more word, no trailing space
            <= maxWidth
        )) {
            let w = words[i];
            line.push(w);
            lineWidth += w.length;
            i++;
        }

        // format the line
        if(i < words.length) {
            lines.push(formatLine(line, lineWidth, maxWidth));
        } else {
            lines.push(formatLastLine(line, lineWidth, maxWidth));
            break;
        }
    }
    return lines;
};

function formatLine(words, wordsWidth, maxWidth) {
    let spaceSlots = words.length - 1;
    let spaceRemaining = maxWidth - wordsWidth;
    if(spaceSlots === 0) return words[0] + genSpace(spaceRemaining);

    let out = '';
    for(var i=0; i<words.length-1; i++) {
        out += words[i];
        let space = Math.ceil(spaceRemaining / spaceSlots);
        out += genSpace(space);
        spaceRemaining -= space;
        spaceSlots--;
    }
    out += words[i];
    return out;
}

function formatLastLine(words, wordsWidth, maxWidth) {
    return words.join(' ') + genSpace(maxWidth - wordsWidth - words.length + 1);
}

function genSpace(n) {
    let out = '';
    for(let i=0; i<n; i++) {
        out += ' ';
    }
    return out;
}
