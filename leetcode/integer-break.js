/* positive integer n

sum of at least two positive integers, maximize the product.

Return product

n >= 2

ex: 10: 3 + 3 + 4 =

Brute force:
	- split for all n's

Dynamic programming solution:
 - record answers counting up to n

 Something clever: bet there are some numeric properties that we could exploit
  - write out examples, look for patterns

Let's start dynamic, exploit associativity:

2: 1
3: 2
4: -> 2+2: 4
5: -> 2+3: 6
6: -> 3+3: 9
10: 6 + 4 -> 3+3+2+2 -> 36
*/

function maximizeProductOfSummands(n) {

  // special cases where product of summands is less than original
  if(n === 2) {
    return 1
  }
  if(n === 3) {
    return 2
  }

  memos = [0, 1, 2, 3]; // 4, 6, 9, 12, 12, 27, 36
  for(var i=4; i<=n; i++) {
  	// build up maxes
  	var max = 1;
  	for(var k=1; k<(i/2+1); k++) {
	  var product = memos[k] * memos[i-k];
  	  if(product > max) {
  	    max = product;
  	  }
  	}
  	memos[i] = max;
  }
  return memos[n];
}

/*
Properties of integers:

maximize number of threes, always bump down if there's a  remainder

n / 3
4/ 3 = 1.33
5 / 3 = 1.66
6/3 = 2
10 / 3 = 3.333

if % 3 > 0.5 use it, else round down.
*/

function maximizeProductOfSummands(n) {
  if(n === 2) {
    return 1
  }
  if(n === 3) {
    return 2
  }

  var quotient = Math.floor(n / 3);
  var remainder = n % 3;

  if(remainder === 0) {
    return Math.pow(3, quotient);
  }
  if(remainder === 1) {
    return Math.pow(3, (quotient - 1)) * 4;
  }
  return Math.pow(3, quotient) * 2;
}
