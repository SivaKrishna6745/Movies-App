import React, { useCallback, useEffect, useState } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

const BASE_URL = 'https://imdb.iamidiotareyoutoo.com';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const formattedMovieData = (movie) => {
        console.log(movie);
        let formattedMovie = {};
        for (let key in movie) {
            if (key.includes('#')) formattedMovie[key.replace('#', '')] = movie[key];
            else formattedMovie[key] = movie[key];
        }
        return { ...formattedMovie };
    };

    const fetchMovies = useCallback(async () => {
        if (searchTerm.length <= 2) return;

        setIsLoading(true);
        setErrorMessage('');
        try {
            const endPoint = BASE_URL + `/search?q=${searchTerm}`;
            console.log(endPoint);
            const data = await fetch(endPoint).then((res) => res.json());
            const formattedMovies = data?.description ? data.description.map(formattedMovieData) : [];
            setMovies(formattedMovies);
        } catch (error) {
            console.error(`Error fetching movies: ${error}`);
            setErrorMessage('Error fetching movies. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <header className="mt-0">
                    <img src="./hero.png" alt="hero banner" className="max-h-[400px]" />
                    <h1 className="text-5xl">
                        Find <span className="text-gradient">Movies</span> you'll enjoy without the hassle.
                    </h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>
                {searchTerm.length > 2 && (
                    <section className="all-movies">
                        <h2 className="mt-[40px]">All Movies</h2>
                        {isLoading ? (
                            <Spinner />
                        ) : errorMessage ? (
                            <p className="text-red-500">{errorMessage}</p>
                        ) : (
                            <ul>
                                {movies.map((movie) => (
                                    <MovieCard key={movie.IMDB_ID} movie={movie} baseURL={BASE_URL} />
                                ))}
                            </ul>
                        )}
                    </section>
                )}
            </div>
        </main>
    );
};

export default App;
