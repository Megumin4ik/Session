import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null); 
  const [isFavorite, setIsFavorite] = useState(false); 

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=34fc1abd`);
      const data = await response.json();
      setMovie(data); 
      checkIfFavorite(data.imdbID); 
    } catch (error) {
      console.error('Ошибка при загрузке данных фильма:', error);
    }
  };

  const checkIfFavorite = (movieId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(fav => fav.imdbID === movieId));
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    fetchMovieDetails(); 
  }, [id]);

  if (!movie) {
    return <div>Загрузка...</div>; 
  }

  return (
    <div className="movie-details">
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      <div>
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
      </div>
      <button className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`} onClick={toggleFavorite}>
        {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      </button>
    </div>
  );
};

export default MovieDetails;
