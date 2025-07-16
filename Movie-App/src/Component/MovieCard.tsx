import React from 'react'

function MovieCard({ movie:
  { title, vote_average, poster_path, release_date, original_language } }) {
  return (
    <div><p className=' text-gray-50 grid-rows-4'>{movie.title}</p></div>
  )
}

export default MovieCard