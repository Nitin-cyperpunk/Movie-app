import React from 'react';
type Movie = {
    title: string;
    vote_average: number;
    poster_path: string;
    release_date: string;
    original_language: string;
    overview: string;
};

type MovieDetailsProps = {
    movie: Movie;
};

function MovieDetails({ movie }: MovieDetailsProps) {
    return (
        <div>
            <div className="text-white text-center text-6xl">Movie Details</div>
            <div className="w-full h-screen flex flex-col items-center justify-center">
               <img src={movie.poster_path} alt="" className='w-[400px] h-[400px]' />
                <div className="text-4xl text-amber-300 font-bold mb-2 ">{movie.title}</div>
                <div className="text-lg text-amber-200 mb-1">Rating: {movie.vote_average}</div>
                <div className="text-lg text-amber-200 mb-1">Release Date: {movie.release_date}</div>
                <div className="text-lg text-amber-200 mb-1">Language: {movie.original_language}</div>
                <div className="text-base mt-4 max-w-2xl text-amber-300 ">{movie.overview}</div>
            </div>
        </div>
    );
}

export default MovieDetails;

