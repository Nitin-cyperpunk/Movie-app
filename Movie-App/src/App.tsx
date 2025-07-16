import React from 'react'
import {useEffect, useState } from 'react'
import Spinner from './Component/Spinner';
import Search from './Component/Search'
import MovieCard from './Component/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const access_token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${access_token}`
  }
}
const App = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const [movieslist, setMovieslist] = useState([]);
   const [loading, setLoading] = useState(false);
   const fetchMovies = async () => {
    setLoading(true);
    setErrorMessage('');
    try{
    const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint, API_OPTIONS);
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    
    }
    const data = await response.json();
    if(data.Response === 'False') {
      setErrorMessage(data.Error || 'Failed to fetch movies. Please try again later.');
      setMovieslist([]);
      return;
    }
    setMovieslist(data.results || []);
  }catch (error) {
      console.error(`Error fetching movies:, ${error}`);
      setErrorMessage('Failed to fetch movies. Please try again later.');
   }finally{
    
    setLoading(false);
   }
   }


   useEffect(() => {
    fetchMovies();
   }, []);
   
  return (
    
   <main>
    <div className="pattern" />
    <div className="wrapper bg-[background-image-hero-pattern] bg-cover bg-no-repeat bg-center">
      <header className="">
        <img src="./hero-img.png" alt="Hero banner" className="rounded-md" />
        <h1 className="">You Can find ur <span className="text-gradient">Movie</span> right here just search it</h1>
      <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
     
      </header>

      <section className="trendy-movies">
        <h1 className="text-2xl text-left mt-[30px] text-gray-50">Trendy Movies</h1>
        {loading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (<ul>
          {movieslist.map((movie) => (
           <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
        )}
      </section>
    </div>
   </main>
  )
}

export default App