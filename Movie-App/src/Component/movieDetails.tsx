import  { useState } from 'react';

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
    const [counter, setCounter] = useState(1);

    return (
        <>
            <div className="text-white text-center text-6xl">Movie Details</div>
            <div className="w-full h-screen flex flex-col sm:flex-row  gap-2 items-center justify-center">
                <div className="w-1/2 h-auto items-end justify-end">
                    <img
                        src={`https://picsum.photos/400?random=${Math.random()}`}
                        alt="Random"
                        className="w-[400px] h-[400px] rounded-xl object-cover"
                    />
                </div>
                <div className="w-1/2 h-auto flex flex-col items-center justify-center">
                    <div className="text-4xl text-amber-300 font-bold mb-2 ">{movie.title}</div>
                    <div className="text-lg text-amber-200 mb-1">Rating: {movie.vote_average}</div>
                    <div className="text-lg text-amber-200 mb-1">Release Date: {movie.release_date}</div>
                    <div className="text-lg text-amber-200 mb-1">Language: {movie.original_language}</div>
                    <div className="text-base mt-4 max-w-2xl text-amber-300 ">{movie.overview}</div>
                    {counter >= 1 && (
                        <>
                            <div className="text-lg text-amber-200 mb-1 animate-pulse flex flex-row mx-auto">  <button
                                className="mt-2  text-2xl px-4 py-2 rounded animate-pulse"
                                onClick={() => setCounter(counter + 1)}
                            >
                               👍
                            </button>Likes: {counter} </div>
                           
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default MovieDetails;

