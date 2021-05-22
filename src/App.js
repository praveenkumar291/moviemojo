import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./Movie/MovieList";
import MovieListHeading from "./Movie/MovieListHeading";
import SearchBox from "./Movie/SearchBox";
import AddFavourites from "./Movie/AddFavourites";
import "./Movie/Style.css";
import RemoveFavourites from "./Movie/RemoveFavourites";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=3d79149e`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);
  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };
  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    setFavourites(movieFavourites);
  }, []);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movies];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };
  const RemoveFavouriteMovie = () => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movies.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row"></div>
      <div className="row d-flex align-items-center">
        <MovieListHeading heading="Movies" />
        <SearchBox SearchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className="row">
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className="row d-flex align-items-center">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouritesClick={RemoveFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};
export default App;
