import React, { useReducer, useEffect } from "react";
// styles
import "./App.css";
// components
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";

const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=37dc294e";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIE_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIE_SUCCESS":
      return {
        ...state,
        loading: false,
        errorMessage: null,
        movies: action.payload
      };
    case "SEARCH_MOVIE_FAIL":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };

    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIE_SUCCESS",
          payload: jsonResponse.Search
        });
        console.log(state);
      });
  }, []);

  const search = searchValue => {
    dispatch({ type: "SEARCH_MOVIE_REQUEST" });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=37dc294e`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIE_SUCCESS",
            payload: jsonResponse.Search
          });
        } else {
          dispatch({ type: "SEARCH_MOVIE_FAIL", error: jsonResponse.Error });
        }
      });
  };
  const { loading, errorMessage, movies } = state;
  return (
    <div className="App">
      <Header title="Hooks Movie Search" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies!</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : movies ? (
          <div className="movies-container">
            {movies.map((movie, index) => (
              <Movie
                key={`key-${movie.Title}-${movie.Year}`}
                movie={movie}
              ></Movie>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
