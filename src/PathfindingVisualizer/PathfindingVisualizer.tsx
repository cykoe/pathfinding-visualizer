import React, {Component} from 'react';
import Node, {INode} from './Node/Node';
import dfs, {getNodesInShortestPathOrder} from '../algorithms/dfs';
import bfs from '../algorithms/bfs';

import './PathfindingVisualizer.scss';

const START_NODE_ROW = 8;
const START_NODE_COL = 3;
const FINISH_NODE_ROW = 18;
const FINISH_NODE_COL =9;

export default class PathfindingVisualizer extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid(window.innerWidth, window.innerHeight);
    this.setState({grid});
  }

  handleMouseDown(row: number, col: number) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row: number, col: number) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animateDijkstra(visitedNodesInOrder: any, nodesInShortestPathOrder: any) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        // @ts-ignore
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder: any) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        // @ts-ignore
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 10 * i);
    }
  }

  visualizeDFS() {
    const {grid} = this.state;
    this.setState({isDfs: true});
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeBFS() {
    const {grid} = this.state;
    this.setState({isBfs: true});
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        <div className="grid">
          {grid.map((row: INode[], rowIdx: number) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(
                        row: number, col: number) => this.handleMouseDown(row,
                        col)}
                      onMouseEnter={(row: number, col: number) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className='buttons'>
          <div>Drag on grids to create walls</div>
          <button onClick={() => this.visualizeDFS()} disabled={this.state.isBfs}>
            Visualize DFS
          </button>
          <button onClick={() => this.visualizeBFS()} disabled={this.state.isDfs}>
            Visualize BFS
          </button>
        </div>
      </>
    );
  }
}

const getInitialGrid = (width: number, height: number) => {
  const grid = [];
  const rowNums = Math.floor(height * 0.7 / 25);
  const colNums = Math.floor(width * 0.8 / 25);
  console.log(width, colNums, height, rowNums);
  for (let row = 0; row < rowNums; row++) {
    const currentRow = [];
    for (let col = 0; col < colNums; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col: number, row: number) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid: any, row: number, col: number) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
