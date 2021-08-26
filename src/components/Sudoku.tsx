import React from "react";
import "./Sudoku.scss";

function SudokuItem() {
  return (
    <div className="game-board">
      <div className="box">200px x 200px</div>
      <div className="box">200px x 200px</div>
      <div className="box">200px x 200px</div>
      <div className="box">200px x 200px</div>
      <div className="box">200px x 200px</div>
      <div className="box">200px x 200px</div>
      <div className="box">200px x 200px</div>
      <div className="box">200px x 200px</div>
      <div className="box">200px x 200px</div>
    </div>
  );
}

const SudokuRow = () => {
  return (
    <div className="sudoku-container">
      {[0, 1, 2].map((_, i) => (
        <SudokuItem key={i} />
      ))}
    </div>
  );
};

function Sudoku() {
  return (
    <section>
      <SudokuRow />
      <SudokuRow />
      <SudokuRow />
    </section>
  );
}

export default Sudoku;
