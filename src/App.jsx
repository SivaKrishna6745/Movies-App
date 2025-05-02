import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';

const API_URL = 'https://imdb.iamidiotareyoutoo.com/';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('spiderman');
    const [errorMessage, setErrorMessage] = useState('');
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const formattedMovieData = (movie) => {
        let formattedMovie = {};
        for (let key in movie) {
            if (key.includes('#')) formattedMovie[key.replace('#', '')] = movie[key];
            else formattedMovie[key] = movie[key];
        }
        return { ...formattedMovie };
    };

    const fetchMovies = async () => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const endPoint = API_URL + `search?q=${searchTerm}`;
            const data = await fetch(endPoint).then((res) => res.json());
            const formattedMovies = data?.description?.map(formattedMovieData);
            setMovies(formattedMovies);
        } catch (error) {
            console.error(`Error fetching movies: ${error}`);
            setErrorMessage('Error fetching movies. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchMovies();
    }, []);

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
                <section className="all-movies">
                    <h2 className="mt-[40px]">All Movies</h2>
                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movies.map((movie) => (
                                <li key={movie.IMDB_ID}>
                                    <p className="text-white">{movie.TITLE}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
};

export default App;
