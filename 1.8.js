/*
 Check if s2 is a rotation of s1 using just
 one call to isSubstring().
*/

isRotation(s1, s2) {
  return (
    (s1.length == s2.length)
    // the trick: double the first string
    && (isSubstring(s1+s1, s2);
  );
}
