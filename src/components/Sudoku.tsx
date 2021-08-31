import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from './Header/Header';
import { useHistory } from 'react-router';
import ActionButton from './ActionButton/ActionButton';
import SudokuGenerator from './../lib/SudokuGame';
import './Sudoku.scss';

enum Difficulty {
  EASY,
  MEDIUM,
  HARD,
}
const defaultLevel = Difficulty.HARD;

/**
 *
 * Percent chance that a number is visible
 */
const randomIsVisible = (level: Difficulty) => {
  const rand = Math.floor(Math.random() * 10);

  switch (level) {
    case Difficulty.EASY:
      return rand <= 8;
    case Difficulty.MEDIUM:
      return rand <= 4;
    case Difficulty.HARD:
      return rand <= 2;
    default:
      return rand <= 2;
  }
};

interface SudokuRowProps {
  data: number[];
  row: number;
  level: Difficulty;
}

const SudokuRow = ({ data, row, level }: SudokuRowProps) => {
  const [originalRowData, setOriginalRowData] = useState<number[]>();

  useEffect(() => {
    setOriginalRowData([...data]);
  }, [level, data]);

  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <div className="box-row">
      {data.map((num, i) => {
        return (
          <div key={`row-${row} column-${i}`} data-column={i} data-row={row} className={`box ${originalRowData?.[i] === -1 ? '' : 'box-is-visible'}`}>
            {num === -1 ? '' : num}
          </div>
        );
      })}
    </div>
  );
};

function Sudoku() {
  const history = useHistory();
  const sudokuGame = useRef(new SudokuGenerator());
  const selectedItem = useRef<HTMLElement>();
  const [board, setBoard] = useState<number[][]>([]);
  const [userBoard, setUserBoard] = useState<number[][]>([]);
  const [attempts, setAttempts] = useState(0);
  const [userWon, setUserWon] = useState<boolean>(false);
  const [level, setLevel] = useState<Difficulty>(defaultLevel);

  useEffect(() => {
    if (userBoard.length) {
      const isValid = sudokuGame.current.isSolutionValid(userBoard);

      if (isValid) {
        setUserWon(true);
      }
    }
  }, [attempts, userBoard, sudokuGame]);

  const removeUneditedField = () => {
    if (selectedItem.current) {
      if (!selectedItem.current.innerText) {
        selectedItem.current.classList.remove('highlighted');
      }
    }
  };

  useEffect(() => {
    if (level !== defaultLevel) {
      removeUneditedField();
      setUserWon(false);
      setUserBoard([]);
      const board = sudokuGame.current.create();
      console.table(board);
      setBoard(board);
    }
  }, [level]);

  useEffect(() => {
    const board = sudokuGame.current.create();
    console.table(board);
    setBoard(board);

    document.addEventListener('keyup', onKeyboardClick);

    return () => {
      document.removeEventListener('keyup', onKeyboardClick);
    };
  }, []);

  useEffect(() => {
    const tmpBoard: number[][] = [];

    if (board.length) {
      for (let row = 0; row < board.length; row++) {
        for (let column = 0; column < board[row].length; column++) {
          tmpBoard[row] = tmpBoard[row] ?? [];
          tmpBoard[row][column] = randomIsVisible(level) ? board[row][column] : -1;
        }
      }
      setUserBoard(tmpBoard);
    }
  }, [level, board]);

  const onBoardClick = useCallback((evt) => {
    const target = evt.target;

    removeUneditedField();

    selectedItem.current = target;

    if (selectedItem.current) {
      selectedItem.current.classList.add('highlighted');
    }
  }, []);

  const onKeyboardClick = useCallback(
    (evt) => {
      if (selectedItem) {
        const column = selectedItem.current?.getAttribute('data-column') as string;
        const row = selectedItem.current?.getAttribute('data-row') as string;

        if (column && row) {
          const val = +evt.key;

          if (!isNaN(val) && val) {
            setUserBoard((b) => {
              b[+row][+column] = +evt.key;
              return b;
            });
            setAttempts((c) => c + 1);
          }
        }
      }
    },
    [selectedItem]
  );

  const onItemClick = useCallback(
    (evt: any) => {
      const target = evt.target;
      const column = selectedItem.current?.getAttribute('data-column') as string;
      const row = selectedItem.current?.getAttribute('data-row') as string;

      if (column && row) {
        setUserBoard((b) => {
          b[+row][+column] = +target?.innerText;
          return b;
        });
        setAttempts((c) => c + 1);
      }
    },
    [selectedItem, setUserBoard]
  );

  return (
    <main className="sudoku-page-banner">
      <Header
        text="Sudoku"
        subText={
          'The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid contain all of the digits from 1 to 9'
        }
      />
      <div className="sudoku-level-selector-container">
        <h4
          className={`sudoku-level-selector ${level === Difficulty.EASY ? 'sudoku-level-selected' : ''}`}
          onClick={() => {
            setLevel(Difficulty.EASY);
            setAttempts(0);
          }}
        >
          Easy
        </h4>
        <h4
          className={`sudoku-level-selector ${level === Difficulty.MEDIUM ? 'sudoku-level-selected' : ''}`}
          onClick={() => {
            setLevel(Difficulty.MEDIUM);
            setAttempts(0);
          }}
        >
          Medium
        </h4>
        <h4
          className={`sudoku-level-selector ${level === Difficulty.HARD ? 'sudoku-level-selected' : ''}`}
          onClick={() => {
            setLevel(Difficulty.HARD);
            setAttempts(0);
          }}
        >
          Hard
        </h4>
      </div>

      <section onClick={onBoardClick}>
        {userBoard.map((_, index) => {
          return <SudokuRow level={level} key={index} row={index} data={userBoard[index]} />;
        })}
      </section>

      {userWon && <h2 className="sudoku-win">You win!</h2>}
      {/* <h4 className="sudoku-level-selector" style={{ color: "white" }}>
        Reset
      </h4> */}
      <br></br>
      <section>
        <ul className="flex-container" onClick={onItemClick}>
          <li className="flex-item">1</li>
          <li className="flex-item">2</li>
          <li className="flex-item">3</li>
          <li className="flex-item">4</li>
          <li className="flex-item">5</li>
          <li className="flex-item">6</li>
          <li className="flex-item">7</li>
          <li className="flex-item">8</li>
          <li className="flex-item">9</li>
        </ul>
      </section>

      <div>
        <ActionButton
          onClick={() => {
            history.push('/');
          }}
        >
          Go Home
        </ActionButton>
        <ActionButton
          disabled={attempts === 0}
          onClick={() => {
            setLevel((level + 1) % 3);
            setAttempts(0);
          }}
        >
          New Game
        </ActionButton>
      </div>
    </main>
  );
}

export default Sudoku;
