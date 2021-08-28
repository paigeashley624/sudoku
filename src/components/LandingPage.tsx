import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.scss';
import { useSwipeable } from 'react-swipeable';

import Header from './Header/Header';
import { ReactComponent as Sudoku } from './../images/sudoku.svg';
import { ReactComponent as TicTacToe } from './../images/tic-tac-toe.svg';
import { ReactComponent as Chess } from './../images/chess.svg';

interface IGame {
  name: string;
  path: string;
  Image: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}
interface GameComponent extends IGame {
  gameIndexVisible: boolean;
  onBackClick: () => void;
  onNextClick: () => void;
}

const GameList: IGame[] = [
  {
    name: 'Sudoku',
    path: 'sudoku',
    Image: Sudoku,
  },
  {
    name: 'Chess',
    path: 'chess',
    Image: Chess,
  },
  {
    name: 'Tic Tac Toe',
    path: 'tic-tac-toe',
    Image: TicTacToe,
  },
];

const Game = ({ Image, name, path, gameIndexVisible, onBackClick, onNextClick }: GameComponent) => {
  const history = useHistory();

  if (!gameIndexVisible) {
    return null;
  }

  return (
    <article>
      <button className="arrow__btn" onClick={onBackClick}>
        ‹
      </button>

      <div className="item">
        <Image
          onClick={() => {
            history.push(path);
          }}
        />
        <p>{name}</p>
      </div>

      <button className="arrow__btn" onClick={onNextClick}>
        ›
      </button>
    </article>
  );
};

const LandingPage = () => {
  const [gameIndexVisible, setGameIndexVisible] = useState<number>(0);

  const onBackClick = useCallback(() => {
    setGameIndexVisible((index) => (index - 1 < 0 ? GameList.length - 1 : index - 1));
  }, []);

  const onNextClick = useCallback(() => {
    setGameIndexVisible((index) => (index + 1 === GameList.length ? 0 : index + 1));
  }, []);

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === 'Right') {
        onNextClick();
      } else if (eventData.dir === 'Left') {
        onBackClick();
      }
    },
  });

  return (
    <main className="landing-page-container">
      <Header />

      <section {...handlers} className="game-wrapper">
        {GameList.map((game, index) => (
          <Game key={game.name} gameIndexVisible={gameIndexVisible === index} onBackClick={onBackClick} onNextClick={onNextClick} {...game} />
        ))}
        <p className="swipe-hint">(Swipe for more games)</p>
      </section>
    </main>
  );
};

export default LandingPage;
