import React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import ActionButton from './../ActionButton/ActionButton';
import Header from './../Header/Header';
import './TicTacToe.scss';

interface SquareProps {
  value: string;
  onClick: () => void;
}

function Square(props: SquareProps) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

interface BoardProps {
  squares: string[];
  onClick: (index: number) => void;
}

class Board extends React.Component<BoardProps, {}> {
  renderSquare(i: number) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

interface TicTacToeProps extends RouteComponentProps {}

interface TicTacToeState {
  history: { squares: string[] }[];
  stepNumber: number;
  xIsNext: boolean;
}

class TicTacToe extends React.Component<TicTacToeProps, TicTacToeState> {
  constructor(props: TicTacToeProps) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const { history: navHistory } = this.props;
    const { history, stepNumber } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = stepNumber === 9 ? "It's a Tie!" : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <main>
        <Header
          text="Tic-Tac-Toe"
          subText={
            'Tic-tac-toe is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game'
          }
        />
        <section className="tic-tac-toe-container">
          <div className="game">
            <div>
              <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
            </div>
            <div className="game-info">
              <p className="game-status-text">{status}</p>

              <div className="button-actions">
                <ActionButton
                  onClick={() => {
                    navHistory.push('/');
                  }}
                >
                  Go Home
                </ActionButton>

                <ActionButton
                  disabled={stepNumber === 0}
                  onClick={() => {
                    this.jumpTo(0);
                  }}
                >
                  Start New Game
                </ActionButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default withRouter(TicTacToe);
