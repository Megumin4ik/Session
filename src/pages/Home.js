import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = ({ movies }) => {
  const navigate = useNavigate();
  const [filterYear, setFilterYear] = useState("");

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`);
  };

  const filteredMovies = movies.filter((movie) => {
    return filterYear ? movie.Year === filterYear : true;
  });

  return (
    <div className="home">
      <div className="filters">
        <label htmlFor="year">Фильтр по году:</label>
        <input
          type="text"
          id="year"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          placeholder="Введите год"
        />
      </div>

      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => handleMovieClick(movie.imdbID)}
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}
                alt={movie.Title}
              />
              <div className="movie-details">
                <p>
                  {movie.Title} ({movie.Year})
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Фильмы не найдены. Попробуйте изменить запрос.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
