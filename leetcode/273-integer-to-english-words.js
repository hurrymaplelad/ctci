/**
 * @param {number} num
 * @return {string}
 * x hundred sixty two
 *
 *
 */
const ONES = [
     '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
     'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
];

const TENS = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];
/*
2^10 = thousand
2^20 = million
2^30 = billion
*/
const LARGE_TERMS = [['Billion', 1000000000], ['Million', 1000000], ['Thousand', 1000]];

var numberToWords = function(num) {
    if(num === 0) return 'Zero';
    if(num < 1000) return englishSubThousand(num);
    let terms = [];
    for(let [label, radix] of LARGE_TERMS) {
        let multiple = Math.floor(num / radix);
        if(multiple) {
            terms.push(englishSubThousand(multiple), label);
        }
        num = num % radix;
    }
    if(num) terms.push(englishSubThousand(num));
    return terms.join(' ');
};

function englishSubThousand(num) {
    if(num < 20) return ONES[num];
    if(num < 100) return `${TENS[Math.floor(num/10)]} ${ONES[num % 10]}`.trim();
    return `${ONES[Math.floor(num/100)]} Hundred ${englishSubThousand(num % 100)}`.trim();
}
