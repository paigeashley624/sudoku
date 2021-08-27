import React from "react";
import "./Sudoku.scss";

function SudokuItem() {
  return (
    <div className="game-board">
      <div className="box"></div>
      <div className="box">1</div>
      <div className="box"></div>
      <div className="box">4</div>
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
      <div className="box">5</div>
      <div className="box"></div>
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

      <section>
        <SudokuRow />
        <SudokuRow />
        <SudokuRow />
      </section>
      {/* <h4 className="sudoku-level-selector" style={{ color: "white" }}>
        Reset
      </h4> */}
      <br></br>
      <section>
        <NumberSelector />
      </section>
    </header>
  );
}

// -------start of code for selecting numbers------

function NumberSelector() {
  return (
    <ul className="flex-container">
      <li className="flex-item">1</li>
      <li className="flex-item">2</li>
      <li className="flex-item">3</li>
      <li className="flex-item">4</li>
      <li className="flex-item">5</li>
      <li className="flex-item">6</li>
    </ul>
  );
}

// const NumberRow = () => {
//   return (
//     <div className="number-container">
//       {[1].map((_, i) => (
//         <NumberSelector key={i} />
//       ))}
//     </div>
//   );
// };

// NumberSelector;
export default Sudoku;
