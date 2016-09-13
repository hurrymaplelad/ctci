Given
* 100 floors
* 2 eggs
* find the floor from which the eggs will break
* minimize number of drops in the worst case

Observations:
* No room to guess wrong with the second egg, have to go up 1 floor at a time.
* Could split in half, but guessing too high "costs more" than guessing too low.
* To minimize total drops, minimize worst case drops of first egg + drops of second egg.

Ideas:
* Start from the ground, up one at a time.  Doesn't use the second egg.
* Go up at fixed intervals with the first egg.
 - 10 at a time is optimal worst case, 19 tries.
* Go up non-linearly.

Solution:
 go up 14, then 13, 12, ... , 1. Worst case 14 drops.
