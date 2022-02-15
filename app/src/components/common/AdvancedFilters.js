import React, { useState } from 'react';

const AdvancedFilters = ({filterBooks, orderBy, filters}) => {
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");
    const [filter, setFilter] = useState(filters[0]);
    const [sorting, setSorting] = useState("ASC");
    const [filterOption, setFilterOption] = useState(1);

    const handleSearch = (e) => {
        e.preventDefault();
        filterBooks(search, order, sorting, filterOption);
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
                        {orderBy.map(filter => <option key={filter} value={filter}>{filter}</option>)}
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

                <div className='filter-results'>
                    <span>Filter the results by</span>
                    <select onChange={e => setFilter(e.target.value)} value={filter}>
                        {/* <option value="">select</option> */}
                        {filters.map(filter => <option key={filter} value={filter}>{filter}</option>)}
                    </select>

                    <label htmlFor="yes"> 
                        <input type="radio" id="yes" value={1} onChange={e => setFilterOption(+e.target.value)} checked={filterOption === 1}/>
                yes
                    </label>
                    <label htmlFor="no"> 
                        <input type="radio" id="no" value={0} onChange={e => setFilterOption(+e.target.value)} checked={filterOption === 0}/>
                no
                    </label>
                </div>
                
                <div className='buttons'>
                    <button type="submit">Apply filters</button>
                </div>
                

            </form>
        
        </>
        
    );
};

export default AdvancedFilters;