Game 1: 1 shot
Game 2: make 2 of 3 shots
probability p of making a shot

for which values of p do we prefer Game 1?
---------------
P(G1) = p
P(G2) = make 1st & second or make 2nd & 3rd or make 1st & 3rd (3 choose 2 combos)
      = P(1 & 2) or p(2 & 3) or p(1 & 3)
      = p*p or p*p or p*p
      = p*p + p*p - p*p*p or p*p
      = p*p + p*p - p*p*p + p*p - p*p*p
      = 3p^2 - 2p^3

P(G1) > P(G2)
p > 3p2 - 2p3
2p3 - 3p2 + p > 0
p(2p2 - 3p + 1) > 0
p(2p - 1)(p - 1) > 0
We know 0 <=p <= 1; Always have negative p-1 term, so we only care about the negative case for 2p-1 term, 2p-1 < 0, p < 1/2.

We prefer G1 when p < 1/2. For p in {0, 1/2, 1}, we're indifferent.
