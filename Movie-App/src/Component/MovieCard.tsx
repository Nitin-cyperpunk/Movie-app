import React from 'react'
import index from './index.css'

const MovieCard = ({ movie:
  { title, vote_average, poster_path, release_date, original_language, overview }
}) => {
  return (
    <div className='movie-card'>
      <img
        src={poster_path ?
          `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
        alt={title}
      />
      <div className="mt-4">
        <h3 className="font-extralight  text-xl">{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="./star.png" alt="" className="w-7 h-7" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <p className='lang'>{original_language}</p>
          <span>.</span>
          <p className='date text-white'>{release_date ? release_date.slice(0, 4) : 'N/A'}</p>
        </div>
      </div>
      </div>
  )
}

export default MovieCard