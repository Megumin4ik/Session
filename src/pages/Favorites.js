import React from "react";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";

const Favorites = ({ favorites }) => {
  const navigate = useNavigate();

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="favorites">
      <h2>Избранные фильмы</h2>
      <div className="movie-list">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => handleMovieClick(movie.imdbID)}
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}
                alt={movie.Title}
              />
              <p>
                {movie.Title} ({movie.Year})
              </p>
            </div>
          ))
        ) : (
          <p>Нет избранных фильмов.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
