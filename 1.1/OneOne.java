/*
* Determine if a string has all unique characters.
* Can you do it without additional data structures?
*/

import java.util.Arrays;

class OneOne {
  public static void main(String[] args) {
    char[] input1 = "abc".toCharArray();
    char[] input2 = "abcb".toCharArray();
    System.out.println(hasUniqueCharacters(input1));
    System.out.println(hasUniqueCharacters(input2));
  }

  private static boolean hasUniqueCharacters(char[] input) {
    char last = '\0';
    Arrays.sort(input);
    for (char c : input) {
      if (last == c) {
        return false;
      }
      last = c;
    }
    return true;
  }
}
