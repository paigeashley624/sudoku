import React from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.scss';

import Header from './Header/Header';
import { ReactComponent as Sudoku } from './../images/sudoku.svg';
import { ReactComponent as TicTacToe } from './../images/tic-tac-toe.svg';
import { ReactComponent as Chess } from './../images/chess.svg';

interface IGame {
  name: string;
  index: number;
  Image: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}
interface GameComponent extends IGame {
  path: string;
}

const GameList: GameComponent[] = [
  {
    name: 'Sudoku',
    path: 'sudoku',
    Image: Sudoku,
    index: 0,
  },
  {
    name: 'Chess',
    path: 'chess',
    Image: Chess,
    index: 1,
  },
  {
    name: 'Tic Tac Toe',
    path: 'tic-tac-toe',
    Image: TicTacToe,
    index: 2,
  },
];

const Game = ({ Image, name, index, path }: GameComponent) => {
  const history = useHistory();
  const previousIndex = index - 1 < 0 ? GameList.length - 1 : index - 1;
  const nextIndex = index + 1 === GameList.length ? 0 : index + 1;

  return (
    <section id={`game${index}`}>
      <a className="arrow__btn" href={`#game${previousIndex}`}>
        ‹
      </a>

      <div className="item">
        <Image
          onClick={() => {
            history.push(path);
          }}
        />
        <p>{name}</p>
      </div>

      <a className="arrow__btn" href={`#game${nextIndex}`}>
        ›
      </a>
    </section>
  );
};

const LandingPage = () => {
  return (
    <main className="landing-page-container">
      <Header />

      <div className="game-wrapper">
        {GameList.map((game) => (
          <Game key={game.name} {...game} />
        ))}
      </div>
    </main>
  );
};

export default LandingPage;
