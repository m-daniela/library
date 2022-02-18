import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from 'react-bootstrap';

/**
 * Advanced filters component
 * Search, sort and filter the list of books based
 * on the given criteria (orderBy, filters)
 * @param {*} param0 
 * @returns 
 */
const AdvancedFilters = ({filterBooks, orderBy, filters, removeFilters}) => {
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
            <Form className='filter' onSubmit={handleSearch}>

                <Form.Label htmlFor="search">Search books</Form.Label>
                <Form.Control id="search" onChange={e => setSearch(e.target.value)} value={search} />

                <Form.Label htmlFor='order'>Order the results by</Form.Label>
                <Row id="order">
                    <Col>
                        <Form.Select onChange={e => setOrder(e.target.value)} value={order}>
                            <option value="">select</option>
                            {orderBy.map(filter => <option key={filter} value={filter}>{filter}</option>)}
                        </Form.Select>
                    </Col>
                    

                    <Col>
                        <Form.Check inline type="radio" id="asc" value="ASC" onChange={e => setSorting(e.target.value)} checked={sorting === "ASC"} label="ascending"/>
                    
                    </Col>
                    <Col>
                        <Form.Check inline type="radio" id="desc" value="DESC" onChange={e => setSorting(e.target.value)} checked={sorting === "DESC"} label="descending"/>
                    
                    </Col>

                </Row>

                <Form.Label htmlFor="filter">Filter the results by</Form.Label>

                <Row id="filter">
                    <Col>
                        <Form.Select onChange={e => setFilter(e.target.value)} value={filter}>
                            {/* <option value="">select</option> */}
                            {filters.map(filter => <option key={filter} value={filter}>{filter}</option>)}
                        </Form.Select>
                    </Col>
                    

                    <Col>
                        <Form.Check inline type="radio" id="yes" value={1} onChange={e => setFilterOption(+e.target.value)} checked={filterOption === 1} label="yes"/>
                    </Col>
                    <Col>
                        <Form.Check inline type="radio" id="no" value={0} onChange={e => setFilterOption(+e.target.value)} checked={filterOption === 0}label="no"/>
                    </Col>
                    <Col>
                        <Form.Check inline type="radio" id="all" value={2} onChange={e => setFilterOption(+e.target.value)} checked={filterOption === 2} label="all"/>
                    </Col>

                </Row>

                <ButtonGroup>
                    <Button onClick={removeFilters} variant="secondary">Display all books</Button>
                    <Button type="submit">Apply filters</Button>
                </ButtonGroup>

                
                
                

            </Form>
        
        </>
        
    );
};

export default AdvancedFilters;