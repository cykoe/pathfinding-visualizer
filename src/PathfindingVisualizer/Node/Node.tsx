import React, {Component} from 'react';

import './Node.scss';

export interface INodeProps {
  key: any
  col: any
  isFinish: any
  isStart: any
  isWall: any
  mouseIsPressed: any
  onMouseDown: any
  onMouseEnter: any
  onMouseUp: any
  row: any
}

export interface INode {
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  distance: number;
  isVisited: boolean;
  isWall: boolean;
  previousNode: INode;
}
export default class Node extends Component<INodeProps, any> {
  constructor(props: INodeProps) {
    super(props);
  }

  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? 'node-finish'
      :isStart
        ? 'node-start'
        :isWall
          ? 'node-wall'
          :'';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}/>
    );
  }
}
