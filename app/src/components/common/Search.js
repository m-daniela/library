import React, { useState } from 'react';

/**
 * Search bar
 * @returns 
 */
const Search = ({searchBooks}) => {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        searchBooks(search);
    };

    return (
        <form className='search-bar' onSubmit={handleSearch}>
            <label htmlFor="search">Search books</label>
            <input id="search" onChange={e => setSearch(e.target.value)} value={search} />
            <button type="submit">Go</button>
        </form>
    );
};

export default Search;