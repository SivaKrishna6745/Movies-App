import React from 'react';

const MovieCard = ({ movie: { TITLE, YEAR, IMG_POSTER, RANK, IMDB_ID }, baseURL }) => (
    <li className="movie-card">
        <img src={IMG_POSTER || 'no-movie.png'} alt={`${TITLE} Movie Poster`} className="h-[339.25px]" />
        <div className="mt-4">
            <h3 className="text-white">{TITLE}</h3>
            <div className="content text-white">
                <div className="rating">
                    <img src="star.svg" alt="Star Icon" />
                </div>
                <p>Rank: {RANK}</p>
                <span>•</span>
                <p>{YEAR}</p>
            </div>
            <div className="imdb-url text-white mt-2 underline">
                <a href={`${baseURL}/search?tt=${IMDB_ID}`}>IMDB URL</a>
            </div>
        </div>
    </li>
);

export default MovieCard;
