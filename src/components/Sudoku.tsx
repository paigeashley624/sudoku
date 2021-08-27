import React from "react";
import "./Sudoku.scss";

function SudokuItem() {
  return (
    <div className="game-board">
      <div className="box">9</div>
      <div className="box">9</div>
      <div className="box">9</div>
      <div className="box">9</div>
      <div className="box">9</div>
      <div className="box">9</div>
      <div className="box">9</div>
      <div className="box">9</div>
      <div className="box">9</div>
    </div>
  );
}

const SudokuRow = () => {
  return (
    <div className="sudoku-container">
      {[1, 2, 3].map((_, i) => (
        <SudokuItem key={i} />
      ))}
    </div>
  );
};

function Sudoku() {
  return (
    <header className="sudoku-page-banner">
      {/* need to get this aligned side by side */}
      <h1 className="sudoku-page-banner-title">Sudoku</h1>
      <h4 className="sudoku-level-selector" style={{ color: "white" }}>
        Easy
      </h4>
      <h4 className="sudoku-level-selector" style={{ color: "white" }}>
        Medium
      </h4>
      <h4 className="sudoku-level-selector" style={{ color: "blue" }}>
        Hard
      </h4>

      <section>
        <SudokuRow />
        <SudokuRow />
        <SudokuRow />
      </section>
      <br></br>
      <section>
        <NumberRow />
        <NumberRow />
        <NumberRow />
      </section>
    </header>
  );
}

// -------start of code for selecting numbers------

function NumberSelector() {
  return (
    <div className="number-selector">
      <div className="box">1</div>
      <div className="box">2</div>
      <div className="box">3</div>
      <div className="box">4</div>
      <div className="box">5</div>
      <div className="box">6</div>
      <div className="box">7</div>
      <div className="box">8</div>
      <div className="box">9</div>
    </div>
  );
}

const NumberRow = () => {
  return (
    <div className="number-container">
      {[1, 2, 3].map((_, i) => (
        <SudokuItem key={i} />
      ))}
    </div>
  );
};

export default Sudoku;
