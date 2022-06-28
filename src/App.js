import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';

function App() {
  return (
    <>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
    </>
  );
}

export default App;
