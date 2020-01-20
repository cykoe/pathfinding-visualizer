import {INode} from '../PathfindingVisualizer/Node/Node';

export default function bfs(grid: INode[][], startNode: INode, finishNode: INode) {
  const visitedNodesInOrder: INode[] = [];

  const queue: INode[] = [startNode];
  startNode.distance = 0;

  while (queue.length) {
    const node = queue.shift();
    if (node) {
      if (node.isWall) continue;
      if (node.distance === Infinity) return visitedNodesInOrder;
      if (!node.isVisited) node.isVisited = true;
      visitedNodesInOrder.push(node);
      if (node === finishNode) return visitedNodesInOrder;
      const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
      for (let neighbor of unvisitedNeighbors) {
        queue.push(neighbor);
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
