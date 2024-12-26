import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";

const API_KEY = "34fc1abd";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async (query = "batman") => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Ошибка при загрузке фильмов:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchMovies(term);
  };

  const handleAddToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleRemoveFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter(
      (fav) => fav.imdbID !== movieId
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  };

  useEffect(() => {
    fetchMovies();
    loadFavorites();
  }, []);

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home movies={movies} />} />
        <Route
          path="/favorites"
          element={
            <Home
              movies={favorites}
              onRemoveFromFavorites={handleRemoveFromFavorites}
            />
          }
        />
        <Route
          path="/movies/:id"
          element={<MovieDetails onAddToFavorites={handleAddToFavorites} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
