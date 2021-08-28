import React, { useCallback, useEffect, useRef, useState } from "react";
import SudokuGenerator from "./../lib/SudokuGame";
import "./Sudoku.scss";

/**
 *
 * Percent chance that a number is visible
 */
const randomIsVisible = () => {
  const rand = Math.floor(Math.random() * 10);

  return rand <= 2;
};

interface SudokuRowProps {
  data: number[];
  row: string;
}

const SudokuRow = ({ data, row }: SudokuRowProps) => {
  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <div className="box-row">
      {data.map((num, i) => {
        const isVisible = randomIsVisible();

        return (
          <div
            key={`row-${row} column-${i}`}
            data-column={i}
            data-row={row}
            data-correct-result={num}
            className={`box ${isVisible ? "box-is-visible" : ""}`}
          >
            {isVisible ? num : ""}
          </div>
        );
      })}
    </div>
  );
};

function Sudoku() {
  const sudokuGame = useRef(new SudokuGenerator());
  const selectedItem = useRef();
  const [board, setBoard] = useState<number[][]>([]);
  const [userBoard, setUserBoard] = useState<number[][]>([]);

  useEffect(() => {
    const board = sudokuGame.current.create();
    setBoard(board);
    // [] is when a component mounts
  }, []);

  const onBoardClick = useCallback((evt) => {
    const target = evt.target;
    selectedItem.current = target;
  }, []);

  const onItemClick = useCallback(
    (evt) => {
      const target = evt.target;
      // @ts-ignore
      const column = selectedItem.current.getAttribute("data-column");
      // @ts-ignore
      const row = selectedItem.current.getAttribute("data-column");

      console.log(`The following item was selected row ${row} and column ${column}`);

      userBoard[row][column] = +target.innerText;
      // @ts-ignore
      selectedItem.current.innerHTML = target.innerText;
    },
    [userBoard, selectedItem]
  );

  return (
    <header className="sudoku-page-banner">
      {/* need to get this aligned side by side */}
      <h1 className="sudoku-page-banner-title">Sudoku</h1>
      <div className="sudoku-level-selector-container">
        <h4 className="sudoku-level-selector" style={{ color: "white" }}>
          Easy
        </h4>
        <h4 className="sudoku-level-selector" style={{ color: "white" }}>
          Medium
        </h4>
        <h4 className="sudoku-level-selector" style={{ color: "blue" }}>
          Hard
        </h4>
      </div>

      <section onClick={onBoardClick}>
        <SudokuRow row="0" data={board[0]} />
        <SudokuRow row="1" data={board[1]} />
        <SudokuRow row="2" data={board[2]} />
        <SudokuRow row="3" data={board[3]} />
        <SudokuRow row="4" data={board[4]} />
        <SudokuRow row="5" data={board[5]} />
        <SudokuRow row="6" data={board[6]} />
        <SudokuRow row="7" data={board[7]} />
        <SudokuRow row="8" data={board[8]} />
      </section>
      {/* <h4 className="sudoku-level-selector" style={{ color: "white" }}>
        Reset
      </h4> */}
      <br></br>
      <section>
        return (
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
