import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TicTacToe from './components/TicTacToe/TicTacToe';
import Sudoku from './components/Sudoku';
import Breakout from './components/MintbeanBreakout/MintbeanBreakout';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/sudoku">
          <Sudoku />
        </Route>
        <Route exact path="/tic-tac-toe">
          <TicTacToe />
        </Route>
        <Route exact path="/breakout">
          <Breakout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
