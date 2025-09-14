import React from 'react'
import {useEffect, useState } from 'react'
import Spinner from './Component/Spinner';
import Search from './Component/Search'
import MovieCard from './Component/MovieCard';
import MovieDetails from './Component/movieDetails';
import { useDebounce } from 'react-use';

import { getTrendingMovies, updateSearchCount } from './appwrite';
export interface MovieType {
      adult: boolean,
      backdrop_path: string,
      genre_ids: number[],
      id: number,
      original_language: string,
      original_title: string,
      overview: string,
      popularity: number,
      poster_path: string,
      release_date: string,
      title: string,
      video: boolean,
      vote_average: number,
      vote_count: number,

    }
export interface MovieInfo {
  id: number;
  title: string;
  poster_url: string;
  search_count: number;
  rating: number;
  release_date: string;
  overview: string;
  genres: string[];
  directors: string[];
  writers: string[];
}
const API_BASE_URL = 'https://api.themoviedb.org/3';
const access_token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${access_token}`
  }
};
  const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieslist, setMovieslist] = useState<MovieType[]>([]);
    const [trendingMovies, setTrendingMovies] = useState<Document[]|undefined>([]);
    const [loading, setLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])
    
    const fetchMovies = async (query = '') => {
      setLoading(true);
      setErrorMessage('');
    try{
    const endpoint = query ?
    `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint, API_OPTIONS);
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    
    }
    const data = await response.json();
    
   if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieslist([]);
        return;
      }
    setMovieslist(data.results || []);
    if(query && data.results.length > 0) {
      await updateSearchCount(query, data.results[0]);
    }
  }catch (error) {
      console.error(`Error fetching movies:, ${error}`);
      setErrorMessage('Failed to fetch movies. Please try again later.');
   }finally{
     
     setLoading(false);
    }
  }
  
  const loadTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovies() ;
      setTrendingMovies(movies );
      
    }catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
      
    }
  }
  
 
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
    
  }, [debouncedSearchTerm]);
  
   useEffect(() => {
     loadTrendingMovies();
    }, []);
    const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  const handleMovieClick = (movie: MovieType) => {
    setSelectedMovie(movie);
  };

  
    
return (
   <main>
    <div className="pattern" />
    <div className="wrapper bg-[background-image-hero-pattern] bg-cover bg-no-repeat bg-center">
      <header>
        <img src="./hero-img.png" alt="Hero banner" className="rounded-md hover:scale-110 duration-300" />
        <h1 className="">You Can find ur <span className="text-gradient">Movie</span> right here just search it</h1>
      <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
     
      </header>
      {/* {trendingMovies.length > 0 && (
      <section className="trending">
        <h2>Tending Movies</h2>
        <ul>
          {trendingMovies.map((movie, index) => (
            <li key={movie.id}>
              <p>{index + 1}</p>
              <img src="{movie.poster_url}" alt="{movie.title}" />
              </li>
          ))}</ul>
        </section>
)} */}

      <section className="all-movies">
        <h1 className="text-2xl text-left mt-[30px] text-gray-50">All Movies</h1>
        {loading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (<ul>
          {movieslist.map((movie) => (
           <div key={movie.id}>
             <MovieCard movie={movie} />
             <button className="" onClick={() => handleMovieClick(movie)}>{selectedMovie?.title}</button>
           </div>
          ))}
        </ul>
        )}
        
      </section>
      <search>
        <input type="text" placeholder="Search..." />
        <button type="submit">Search</button>
      </search>
{movieslist.length > 0 && (
  <MovieDetails movie={movieslist[3]}    />
)}
    </div>
   </main>
  )
}

export default App