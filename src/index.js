import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  if (props.value)
    return <div className="square square-light" onClick={() => props.onClick()} />;
  else
    return <div className="square square-dark" onClick={() => props.onClick()} />;
}

function calculateWin(squares) {
    for (var i = 0; i < squares.length; i++) {
        for (var light of squares[i]) {
            if (light){
                return false;
            }
        }
    }
    return true;
}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        squares: [
            [0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0],
        ],
    };
  }
  handleClick(i, j) {
    const squares = this.state.squares.slice();
    if (calculateWin(squares)) {
        return;
    }
    const neighbors = [[i, j], [i, j+1], [i, j-1], [i+1, j], [i-1, j]];
    for (var neighbor of neighbors) {
        const x = neighbor[0], y = neighbor[1];
        if ((0 <= x) && (0 <= y) && (x < squares.length) && (y < squares[0].length)){
            squares[x][y] = 1 - squares[x][y];
        }
    }
    this.setState({
        squares: squares,
    });
  }

  renderSquare(i, j) {
    return <Square key={i + "," + j} value={this.state.squares[i][j]} onClick={() => this.handleClick(i, j)}/>;
  }

  renderRow(i) {
    const lights = this.state.squares[i].map((light, j) => this.renderSquare(i, j));
    return <div className="board-row" key={"board-row"+i}>{lights}</div>
  }

  render() {
    let status;
    if (calculateWin(this.state.squares)) {
        status = 'You Win!';
    }
    else {
        status = "Turn off all lights"
    }
    const lights = this.state.squares.map((row, i) => this.renderRow(i));
    return (
      <div className="game">
        <div className="game-board">
        <div className="status">{status}</div><br/>
        <div className="light-board">{lights}</div></div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return <Board  key="board"/>;
  }
}

// ========================================

ReactDOM.render(
  <Game  key="game"/>,
  document.getElementById('root')
);

