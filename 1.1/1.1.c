/*
* Determine if a string has all unique characters.
* Can you do it without additional data structures?
* Strategies:
*  Sort in place, scan for duplicates (n log n time, constant space)
*  Hash all the characters, checking for dupes. O(N) time, O(N) space.
*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

char input1[] = "acb";
char input2[] = "abcb";

int compare(const void * a, const void * b) {
  int c1 = *(char *)a, c2 = *(char *)b;
  return c1 - c2;
}

// abbc
bool hasUniqueCharacters(char input[]) {
  int length = strlen(input);
  qsort(input, length, sizeof(char), compare);
  char last = '\0'; // assumes no null characters in string
  for(int i=0; i<length; i++) {
    if(last == input[i]) {
      return false;
    }
    last = input[i];
  }
  return true;
}

int main(void) {
  printf("%d\n", hasUniqueCharacters(input1));
  printf("%d\n", hasUniqueCharacters(input2));
  return 0;
}
