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


import copy from 'copy-to-clipboard';

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

class Game extends React.Component {
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
      window.location.href = getBaseUrl();
      return;
    }
    click_square(squares, i, j);
    this.setState({
        squares: squares,
    });
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Status squares={ this.state.squares } />
          <Board squares={ this.state.squares } clickHandler={this.handleClick.bind(this)} />
          <ShareBoard squares={ this.state.squares } />
        </div>
      </div>
    )
  }
}

class ShareBoard extends React.Component {
  encode_squares() {
    var mask = 0;
    for (var i=0; i<5; i++) {
      for (var j=0; j<5; j++) {
        mask = (mask << 1) + this.props.squares[5-i-1][5-j-1];
      }
    }
    console.log(mask);
    return mask;
  }
  copyState() {
    copy(getBaseUrl() + this.encode_squares().toString(16));
  }
  render() {
    return <button className="copy-button" onClick={this.copyState.bind(this)}>Copy to Clipboard</button>;
  }
}

function getBaseUrl() {
  return window.location.protocol + "//" + window.location.host + window.location.pathname;
}

function Status(props) {
  let status;
  if (calculateWin(props.squares))
      status = 'You Win! Click for next...';
  else if (solver.is_solvable(props.squares))
      status = "Turn off all lights";
  else
      status = "Unfortunately, this is not solvable";
  return <div className="status">{status}</div>
}

class Board extends React.Component {
  // need clickHandler
  renderSquare(i, j) {
    return <Square key={i + "," + j} value={this.props.squares[i][j]} onClick={() => this.props.clickHandler(i, j)}/>;
  }

  renderRow(i) {
    const lights = this.props.squares[i].map((light, j) => this.renderSquare(i, j));
    return <div className="board-row" key={"board-row"+i}>{lights}</div>
  }

  render() {
    return <div className="light-board">{ this.props.squares.map((row, i) => this.renderRow(i)) }</div>;
  }
}

ReactDOM.render(
    <Router>
      <Switch>
        <Route path="/" component={Game} />
      </Switch>
    </Router>,
  document.getElementById('root')
);

