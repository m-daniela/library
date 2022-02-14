import React, { useState } from 'react';

const AdvancedFilters = ({filterBooks, filters}) => {
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState(filters[0]);
    const [sorting, setSorting] = useState("ASC");

    const handleSearch = (e) => {
        e.preventDefault();
        filterBooks(search, order, sorting);
    };

    return (
        <>
            <form className='search-bar' onSubmit={handleSearch}>
                <label htmlFor="search">Search books</label>
                <input id="search" onChange={e => setSearch(e.target.value)} value={search} />
                <button type="submit">Go</button>

                <select onChange={e => setOrder(e.target.value)} value={order}>
                    {filters.map(filter => <option key={filter} value={filter}>{filter}</option>)}
                </select>

                <label htmlFor="asc"> 
                    <input type="radio" id="asc" value="ASC" onChange={e => setSorting(e.target.value)} checked={sorting === "ASC"}/>
                Ascending
                </label>
                <label htmlFor="desc"> 
                    <input type="radio" id="desc" value="DESC" onChange={e => setSorting(e.target.value)} checked={sorting === "DESC"}/>
                Descending
                </label>

            </form>
        
        </>
        
    );
};

export default AdvancedFilters;