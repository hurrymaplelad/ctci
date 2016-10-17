/**
 * Definition for undirected graph.
 * function UndirectedGraphNode(label) {
 *     this.label = label;
 *     this.neighbors = [];   // Array of UndirectedGraphNode
 * }
 */

/**
 * @param {UndirectedGraphNode} graph
 * @return {UndirectedGraphNode}
 */
var cloneGraph = function(graph) {
    if(!graph) return null;
    let clonesByLabel = {};
    function walk(node) {
        if(node.label in clonesByLabel) return clonesByLabel[node.label];
        let clone = new UndirectedGraphNode(node.label);
        clonesByLabel[clone.label] = clone;
        clone.neighbors = node.neighbors.map(walk);
        return clone;
    }
    return walk(graph);
};
