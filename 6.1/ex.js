/*
 Given 20 bottles of pills:
 - 19 have 1.0g pills
 - 1 has 1.1g pills
 - use scale only once
 find the bottle with 1.1g pills.

 Notes:
  - can weigh bottle or individual pills.
  - can weigh multiple pills from 1 bottle.
  - must weigh at least 19 pills at once.

 Answer:
  Line up bottles.
  Add n pills from bottle n to the scale.
  The scale will weigh x*0.1 more than if all were 1.0g.
  That is, x = (total - sum({from: 1, to: 20}, (n) => n)) / 0.1.
*/
