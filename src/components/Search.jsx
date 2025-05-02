import React from 'react';

const Search = ({ searchTerm, setSearchTerm }) => {
    const handleChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
    };

    return (
        <div className="search">
            <div>
                <img src="search.svg" alt="search" />
                <input
                    type="text"
                    placeholder="search trhough thousands of movies..."
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default Search;
