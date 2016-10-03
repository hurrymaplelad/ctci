/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 * Notes:
 *   - Trees are fully connected.  from any node we can reach all others.
 * Ideas:
 *   Start at any node. Follow all edges from it, until we either:
 *     - hit one we've already seem (terminate false)
 *     - run out of nodes
 *   When we run out, check for any unvisited orphans. (Alternative, count visited nodes and compare).
 *   Time: O(N + E)
 *   Space: O(N + E)
 */
var validTree = function(n, edges) {
    let visitedCount = 0;
    let nodesByValue = {};
    // Build connected graph
    for(let i=0; i<n; i++) {
        nodesByValue[i] = new Node(i);
    }
    for(let [start, end] of edges) {
        let startNode = nodesByValue[start];
        let endNode = nodesByValue[end];
        startNode.neighbors.push(endNode);
        endNode.neighbors.push(startNode);
    }
    let node = nodesByValue[0];

    function walk(node, source) {
        if(node.visited) {
            return false;
        }
        node.visited = true;
        visitedCount += 1;
        for(let peer of node.neighbors) {
            // Don't go backwards
            if(peer.value !== source.value) {
                if(!walk(peer, node)) {
                    return false;
                }
            }
        }
        return true;
    }
    let cycleDetected = !walk(nodesByValue[0], {value: -1});
    if(cycleDetected || visitedCount < n) {
        return false;
    }
    return true;
};

class Node {
    constructor(n) {
        this.value = n;
        this.neighbors = [];
        this.visited = false;
    }
}
