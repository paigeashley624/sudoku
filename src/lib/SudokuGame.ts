class SudokuGame {
  constructor() {}

  public create = () => {
    return this.createRows();
  };

  public isSolutionValid = (board: number[][]) => {
    return this.areRowsUnique(board) && this.areColumnsUnique(board);
  };

  private areRowsUnique = (board: number[][]) => {
    for (let i = 0; i < board.length; i++) {
      const map: Record<number, number> = {};

      for (let j = 0; j < board[i].length; j++) {
        const element = board[i][j];
        map[element] = map[element] ? map[element] + 1 : 1;

        if (map[element] !== 1) {
          return false;
        }
      }
    }
    return true;
  };

  private areColumnsUnique = (board: number[][]) => {
    for (let i = 0; i < board.length; i++) {
      const map: Record<number, number> = {};

      for (let j = 0; j < board[i].length; j++) {
        const element = board[j][i];
        map[element] = map[element] ? map[element] + 1 : 1;

        if (map[element] !== 1) {
          return false;
        }
      }
    }

    return true;
  };

  private createRows = () => {
    const allPossibleValues = this.createPossibleValues();

    const totalLength = allPossibleValues.length;

    const firstRow = Array(totalLength)
      .fill(0)
      .map((i) => {
        return this.getValueFromArray(allPossibleValues);
      });

    const secondRow = this.shift([...firstRow], 'left', 3);

    const thirdRow = this.shift([...secondRow], 'left', 3);

    const fourthRow = this.shift([...thirdRow], 'left', 1);

    const fifthRow = this.shift([...fourthRow], 'left', 3);
    const sixthRow = this.shift([...fifthRow], 'left', 3);

    const seventhRow = this.shift([...sixthRow], 'left', 1);
    const eightRow = this.shift([...seventhRow], 'left', 3);
    const ninthRow = this.shift([...eightRow], 'left', 3);

    return [firstRow, secondRow, thirdRow, fourthRow, fifthRow, sixthRow, seventhRow, eightRow, ninthRow];
  };

  private shift = (arr: number[], direction: 'left' | 'right', n: number) => {
    let times = n > arr.length ? n % arr.length : n;
    return arr.concat(arr.splice(0, direction === 'right' ? arr.length - times : times));
  };

  private getValueFromArray(arr: number[]) {
    return arr.splice(this.generateRandomNumber(arr.length), 1)[0];
  }

  private createPossibleValues = () => {
    return Array(9)
      .fill(0)
      .map((_, index) => {
        return index;
      });
  };

  private generateRandomNumber(length: number) {
    return Math.floor(Math.random() * length);
  }
}

export default SudokuGame;
