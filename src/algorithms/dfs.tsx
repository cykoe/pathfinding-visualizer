import {INode} from '../PathfindingVisualizer/Node/Node';

export default function dfs(grid: INode[][], startNode: INode, finishNode: INode) {
  const visitedNodesInOrder = [];

  const stack = [];
  stack.push(startNode);
  startNode.distance = 0;

  while (stack.length) {
    const node = stack.pop();
    if (node) {
      if (node.isWall) continue;
      if (!node.isVisited) {
        node.isVisited = true;
      }
      visitedNodesInOrder.push(node);
      if (node === finishNode) {
        return visitedNodesInOrder;
      }
      const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
      for (let neighbor of unvisitedNeighbors) {
        stack.push(neighbor);
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
      }
    }
  }
}

function getUnvisitedNeighbors(node: INode, grid: INode[][]) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

export function getNodesInShortestPathOrder(finishNode: INode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
