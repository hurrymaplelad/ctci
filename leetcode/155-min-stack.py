class MinStack(object):

    def __init__(self):
        """
        initialize your data structure here.
        """
        self.list = [];
        self.count = 0;


    def push(self, x):
        """
        :type x: int
        :rtype: void
        """
        if self.count > 0:
            minSoFar = min(x, self.list[-1][1]);
        else:
            minSoFar = x;

        self.list.append((x, minSoFar));
        self.count += 1;


    def pop(self):
        """
        :rtype: void
        """
        self.count -= 1;
        return self.list.pop()[0];


    def top(self):
        """
        :rtype: int
        """
        return self.list[-1][0];


    def getMin(self):
        """
        :rtype: int
        """
        return self.list[-1][1];


# Your MinStack object will be instantiated and called as such:
# obj = MinStack()
# obj.push(x)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.getMin()
