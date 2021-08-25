import React from 'react';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Awesome Title for Catalog of Games</h1>
      <button
        onClick={() => {
          history.push('/sudoku');
        }}
      >
        Sudoku
      </button>
    </div>
  );
};

export default LandingPage;
