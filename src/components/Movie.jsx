import React from "react";

const DEFAULT_IMAGE_PLACEHOLDER =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({ movie }) => {
  const poster =
    movie.poster === "N/A" ? DEFAULT_IMAGE_PLACEHOLDER : movie.Poster;

  return (
    <div className="movie">
      <img width="200" src={poster} alt={`The movie titled ${movie.Title}`} />
      <p>
        {movie.Title} ({movie.Year})
      </p>
    </div>
  );
};

export default Movie;
