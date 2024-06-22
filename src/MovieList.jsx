// --This assignent was hard to consume for me so I notated quite a bit. Sorry.

import React, { useState, useEffect } from 'react'; // importing useState to allow me to add a state to my functional components
import './MovieList.css';

const MoviesList = () => { //this just defines a funtional component. A basic function that kicks back a React element which we 
  // want to display on the screen.

  const [movies, setMovies] = useState([ //here I'm using the 'useState' hook. The state variable is 'movies' and the NAME of the function
    //is setMovies. The initial value of the 'movies' state is this list below. The list contains an object with 3 properties title, description and genre
    {
      title: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      genre: 'Drama'
    },
    {
      title: 'The Prestige',
      description: 'After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.',
      genre: 'Thriller'
    },
    {
      title: 'Good Will Hunting',
      description: 'Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.',
      genre: 'Drama'
    },
    {
      title: 'Man On Fire',
      description: 'In Mexico City, a former CIA operative swears vengeance on those who committed an unspeakable act against the family he was hired to protect.',
      genre: 'Action'
    },
    {
      title: 'Enemy At The Gates',
      description: 'A Russian and a German sniper play a game of cat-and-mouse during the Battle of Stalingrad.',
      genre: 'Action'
    }
  ]);

  const [currentMovieIndex, setCurrentMovieIndex] = useState(0); //this is a State Hook. Declares a state variable and a function to update it.
        // the currentMovieIndex is initialized at the index of '0' by useState(). The setter fucntion 'setCurrentMovieIndex' is what we use
        // to update the value of the state variable aka its what we use to change the movie being displayed
  
  const [showAction, setShowAction] = useState(false); //this is the new state that will be used for toggling the genre. showAction is the 
        // state variable, which indicates if we're either showing all movies or only action movies. useState is set to false which means that
        //my program will always start by showing all movies. Basically saying no, dont show only action movies.

  const handleNextMovie = () => {
    const filteredMovies = movies.filter(movie => !showAction || movie.genre === 'Action');
        // this filter is necessary in order for the 'Next Movie' button button to work when only the Action movies are displayed
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % filteredMovies.length);
  };   
        // Here we declare a function that is going to call the setter function. The setter function takes the previous index as a parameter.
        // The function executed adds 1 to the previous index to move it to the next index aka next movie. The mod is applied to the length of the list
        // because this ensures that when it reaches the last index (in this case 4), 1 will be added making it 5 and 5 % 5 = 0, sending it back to the
        // beggining

 
  const handleRemoveMovie = (index) => {
    setMovies((prevMovies) => prevMovies.filter((_, i) => i !== index));
        // so here we use setMovies to update the state of movies aka change it up a bit with the action we need. In this case we need to remove
        // a movie from the list. The handleRemoveMovie takes the parameter of 'index', in this case it would be the index we want to remove. We take 
        // prevMovies and run it with a 'filter' function which returns a new array containing everything that 'passes the test' we give it. The 
        // 'test' is checking if the index of each movie in prevMovies doesnt match the index of the movie we're trying to remove, effectively this will
        // only leave out the movie with the index that was given as a parameter to 'handleRemoveMovie'

    if (index === currentMovieIndex) {
      const newIndex = (currentMovieIndex - 1 + movies.length - 1) % (movies.length - 1);
    }   
        // so here we have to update the index of current movie IF the movie we chose to remove was the movie that was currently being shown. We use
        // setCurrentMovieIndex and give it the prevIndex. Since the current movie index should now point to the previous movie in the list (or loop
        // back to the last movie if needed) we subtract 1 from the prevIndex and ALSO subtract 1 again because the length of the list has also gone
        // down. We use mod here again to make sure it loops back to the prooer index if necessary, same as the 'handleNextMovie' scenario.
  };

  // this section is what the component will render aka display on the screen
  return (
    <div className="movies-container">
      <h2>Favorite Movies</h2>
      <button onClick={() => setShowAction(!showAction)}> 
        {/* when this button is clicked, the value of showAction is flipped to the opposite of its value */}
        {showAction ? 'Show All Movies' : 'Show Action Movies'}
         {/*this changes the button text depending on the value of showAction. If True it will show 'Show All Movies'
         if false it will show 'Show Action Movies'  */}
      </button>

      <ul>
        {movies.filter(movie => !showAction || movie.genre === 'Action')
        // this filter here is beautiful. It iterates the filter through every movie. In order to find what to display, it takes the opposite value of
        // showAction and uses it with the logical OR operator. If the value of showAction is false, meaning all movies are showing, it takes the 
        // opposite of that value (!showAction) aka 'true', effectively meeting one of the 'either or' requirements and therefore all movies are displayed.
        // Now, if the opposite value is 'false', the second portion of the 'either or' comes into play which is to check if the movie genre is equal
        // to 'Action', effectively only displaying the Action genre films. Love this.
          .map((movie, index) => (
            // mapping through the filtered list of movies. .map takes the movie object and index of it. It uses that info to display the movie title in
            // a list.
            <li key={index} className="movie-title">
              {movie.title}
              {currentMovieIndex === index && (
                // if the index matches the index value of the currentMovieIndex (which is either the default 0 when the program runs or whatever index
                // its on if the  user has clicked the 'Next Movie' button) the movie description will display
                <div className="movie-description">
                  <p>{movie.description}</p>
                </div>
              )}
              <button onClick={() => handleRemoveMovie(index)}>Remove</button>
              {/* calls the handleRemoveMovie function and passes the index of the movie on which it was clicked */}
            </li>
          ))}
      </ul>
      <button onClick={handleNextMovie}>
        Next Movie
      </button>
    </div>
  );
};

export default MoviesList;
