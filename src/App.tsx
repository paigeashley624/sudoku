import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Sudoku from './components/Sudoku';

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
      </Switch>
    </Router>
  );
}

export default App;
