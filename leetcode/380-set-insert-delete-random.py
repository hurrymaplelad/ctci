import random;

class RandomizedSet(object):

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.values = [];
        self.indicies = {};


    def insert(self, val):
        """
        Inserts a value to the set. Returns true if the set did not already contain the specified element.
        :type val: int
        :rtype: bool
        """
        if val in self.indicies:
            return False;
        self.indicies[val] = len(self.values);
        self.values.append(val);
        return True;


    def remove(self, val):
        """
        Removes a value from the set. Returns true if the set contained the specified element.
        :type val: int
        :rtype: bool
        """
        if val not in self.indicies:
            return False;
        i = self.indicies[val];
        del self.indicies[val];
        last = self.values.pop();
        if i < len(self.values):
            self.indicies[last] = i;
            self.values[i] = last;
        return True;


    def getRandom(self):
        """
        Get a random element from the set.
        :rtype: int
        """
        if len(self.values) < 1:
            return None;
        return random.choice(self.values);


# Your RandomizedSet object will be instantiated and called as such:
# obj = RandomizedSet()
# param_1 = obj.insert(val)
# param_2 = obj.remove(val)
# param_3 = obj.getRandom()
