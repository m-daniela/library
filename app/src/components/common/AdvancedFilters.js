import React, { useState } from 'react';

const AdvancedFilters = ({filterBooks, filters}) => {
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");
    const [sorting, setSorting] = useState("ASC");

    const handleSearch = (e) => {
        e.preventDefault();
        filterBooks(search, order, sorting);
    };

    return (
        <>
            <form className='filter' onSubmit={handleSearch}>
                <div className='search-bar'>
                    <label htmlFor="search">Search books</label>
                    <input id="search" onChange={e => setSearch(e.target.value)} value={search} />
                </div>

                <div className='order'>
                    <span>Order the results by</span>
                    <select onChange={e => setOrder(e.target.value)} value={order}>
                        <option value="">select</option>
                        {filters.map(filter => <option key={filter} value={filter}>{filter}</option>)}
                    </select>

                    <label htmlFor="asc"> 
                        <input type="radio" id="asc" value="ASC" onChange={e => setSorting(e.target.value)} checked={sorting === "ASC"}/>
                ascending
                    </label>
                    <label htmlFor="desc"> 
                        <input type="radio" id="desc" value="DESC" onChange={e => setSorting(e.target.value)} checked={sorting === "DESC"}/>
                descending
                    </label>
                </div>
                
                <button type="submit">Apply filters</button>


                

            </form>
        
        </>
        
    );
};

export default AdvancedFilters;