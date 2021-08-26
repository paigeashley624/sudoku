import SudokuGame from './SudokuGame';

describe('sudoku', () => {
  describe('isSolutionValid', () => {
    it('should be able to validate solutions', () => {
      const sudokuGame = new SudokuGame();

      expect(
        sudokuGame.isSolutionValid([
          [1, 2],
          [2, 1],
        ])
      ).toBeTruthy();

      expect(
        sudokuGame.isSolutionValid([
          [4, 3, 2, 1],
          [1, 2, 3, 4],
          [2, 1, 4, 3],
          [3, 4, 1, 2],
        ])
      ).toBeTruthy();
    });

    it('should be able to validate invalid solutions', () => {
      const sudokuGame = new SudokuGame();

      expect(
        sudokuGame.isSolutionValid([
          [1, 2],
          [1, 2],
        ])
      ).toBeFalsy();

      expect(
        sudokuGame.isSolutionValid([
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [2, 1, 4, 3],
          [3, 4, 1, 2],
        ])
      ).toBeFalsy();
    });
  });

  it('should create rows with unique numbers', () => {
    const sudokuGame = new SudokuGame();

    const sudokuBoard = sudokuGame.create();

    for (let i = 0; i < sudokuBoard.length; i++) {
      const map: Record<number, number> = {};

      for (let j = 0; j < sudokuBoard[i].length; j++) {
        const element = sudokuBoard[i][j];
        map[element] = map[element] ? map[element] + 1 : 1;

        expect(map[element]).toEqual(1);
      }
    }

    expect(sudokuGame.isSolutionValid(sudokuBoard)).toBeTruthy();
  });

  it('should create columns with unique numbers', () => {
    const sudokuGame = new SudokuGame();

    const sudokuBoard = sudokuGame.create();

    for (let i = 0; i < sudokuBoard.length; i++) {
      const map: Record<number, number> = {};

      for (let j = 0; j < sudokuBoard[i].length; j++) {
        const element = sudokuBoard[j][i];
        map[element] = map[element] ? map[element] + 1 : 1;

        expect(map[element]).toEqual(1);
      }
    }
  });
});
