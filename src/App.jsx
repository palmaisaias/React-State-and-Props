import React from 'react';
import MoviesList from './MovieList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie title and description list thingy</h1>
      </header>
      <MoviesList />
    </div>
  );
};

export default App;
