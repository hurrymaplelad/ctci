Swap two numbers, x and y, without a temporary variable.
==========

Idea:
 - XOR sounds promising

x = x^y
y = x^y
x = x^y

Reasoning:
Let x0 be the original value of x.
Let y0 be the original value of y.

x = x0^y0
y = x^y0 = (x0^y0)^y0 = x0
x = x^y = (x0^y0)^x0 = y0

Note that XOR is commutative and associative, that x^0 = x, and that x^x=0.
