#include <stdio.h>
#include <string.h>

char input1[] = "abc";
char input2[] = "abcb";

void reverse(char* str) {
  int length = strlen(str);
  for(int i=0; i<length/2; i++) {
    char swap = str[i];
    str[i] = str[length-1-i];
    str[length-1-i] = swap;
  }
}

int main(void) {
  printf("%s\n", input1);
  reverse(input1);
  printf("%s\n", input1);

  printf("%s\n", input2);
  reverse(input2);
  printf("%s\n", input2);

  printf("\n");
}
