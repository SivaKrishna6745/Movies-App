import React, { useState } from 'react';
import Search from './components/Search';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <header className="mt-0">
                    <img src="./hero.png" alt="hero banner" className="max-h-[400px]" />
                    <h1 className="text-5xl">
                        Find <span className="text-gradient">Movies</span> you'll enjoy without the hassle.
                    </h1>
                </header>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <h2 className="text-white">{searchTerm}</h2>
            </div>
        </main>
    );
};

export default App;
