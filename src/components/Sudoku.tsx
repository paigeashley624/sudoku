import React, { useCallback, useEffect, useRef, useState } from "react";
import SudokuGenerator from "./../lib/SudokuGame";
import "./Sudoku.scss";

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
      return rand <= 5;
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
    if (!originalRowData) {
      setOriginalRowData([...data]);
    }
  }, [originalRowData, data]);

  useEffect(() => {
    if (level !== defaultLevel) {
      setOriginalRowData([...data]);
    }
  }, [level, data]);

  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <div className="box-row">
      {data.map((num, i) => {
        return (
          <div
            key={`row-${row} column-${i}`}
            data-column={i}
            data-row={row}
            className={`box ${originalRowData?.[i] === -1 ? "" : "box-is-visible"}`}
          >
            {num === -1 ? "" : num}
          </div>
        );
      })}
    </div>
  );
};

function Sudoku() {
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

  useEffect(() => {
    if (level !== defaultLevel) {
      setUserWon(false);
      setUserBoard([]);
      const board = sudokuGame.current.create();
      setBoard(board);
    }
  }, [level]);

  useEffect(() => {
    const board = sudokuGame.current.create();
    setBoard(board);
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
    selectedItem.current = target;

    if (selectedItem.current) {
      selectedItem.current.classList.add("highlighted");
    }
  }, []);

  const onItemClick = useCallback(
    (evt: any) => {
      const target = evt.target;
      const column = selectedItem.current?.getAttribute("data-column") as string;
      const row = selectedItem.current?.getAttribute("data-row") as string;

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
    <header className="sudoku-page-banner">
      {/* need to get this aligned side by side */}
      <h1 className="sudoku-page-banner-title">Sudoku</h1>
      <div className="sudoku-level-selector-container">
        <h4
          className={`sudoku-level-selector ${level === Difficulty.EASY ? "sudoku-level-selected" : ""}`}
          onClick={() => setLevel(Difficulty.EASY)}
        >
          Easy
        </h4>
        <h4
          className={`sudoku-level-selector ${level === Difficulty.MEDIUM ? "sudoku-level-selected" : ""}`}
          onClick={() => setLevel(Difficulty.MEDIUM)}
        >
          Medium
        </h4>
        <h4
          className={`sudoku-level-selector ${level === Difficulty.HARD ? "sudoku-level-selected" : ""}`}
          onClick={() => setLevel(Difficulty.HARD)}
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
    </header>
  );
}

export default Sudoku;
