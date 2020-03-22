import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import queryString from 'query-string'
import {
  BrowserRouter as Router,
  Switch,
  Route,
//   Link,
//   useParams
} from "react-router-dom";

const solver = require('./solver');

function Square(props) {
  if (props.value)
    return <div className="square-box"><div className="square square-light" onClick={() => props.onClick()} /></div>;
  else
    return <div className="square-box"><div className="square square-dark" onClick={() => props.onClick()} /></div>;
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

function click_square(squares, i, j) {
    const neighbors = [[i, j], [i, j+1], [i, j-1], [i+1, j], [i-1, j]];
    for (var neighbor of neighbors) {
        let [x, y] = neighbor;
        if ((0 <= x) && (0 <= y) && (x < squares.length) && (y < squares[0].length)){
            squares[x][y] = 1 - squares[x][y];
        }
    }
}

function random_squares() {
  let squares = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (Math.random() < 0.5) {
        click_square(squares, i, j);
      }
    }
  }
  return squares;
}

function encode_squares(masks) {
  let squares = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (masks & (1<<(i*5+j))) {
        squares[i][j] = 1;
      }
    }
  }
  return squares;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        squares: encode_squares(0),
    };
  }
  debug(squares) {
    let solution = solver.solve(squares);
    for (var i =0; i<5; i++) {
      console.log(solution.slice(5*i, 5*(i+1)));
    }
  }
  componentDidMount() {
    let args = queryString.parse(this.props.location.search);
    args["q"] = args["q"] || "0";
    let state = (args["q"].startsWith("0b")) ? parseInt(args["q"].slice(2), 2) : parseInt(args["q"] || "0");
    let squares = (state === 0 || isNaN(state)) ? random_squares() : encode_squares(state);
    this.debug(squares);
    this.setState({
      squares: squares
    });
  }
  handleClick(i, j) {
    const squares = this.state.squares.slice();
    if (calculateWin(squares)) {
        return;
    }
    click_square(squares, i, j);
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
    else if (solver.is_solvable(this.state.squares)) {
        status = "Turn off all lights";
    }
    else {
        status = "Unfortunately, this is not solvable";
    }
    const lights = this.state.squares.map((row, i) => this.renderRow(i));
    return (
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <div className="light-board">{lights}</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
    <Router>
    <Switch>
  <Route path="/" component={Board} />
</Switch>
    </Router>,
  document.getElementById('root')
);

