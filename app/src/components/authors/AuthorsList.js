import React, { useState, useEffect } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { getAuthors } from '../../utils/serverCalls';
import Author from './Author';

const AuthorsList = ({authors, isLoading}) => {
    
    return (
        <Row className="authors my-5">
            {
                isLoading ? 
                    <Spinner animation="grow" />
                    :
                    <>{authors?.map(author => <Author key={author.id} author={author}/>)}</>
            }
            
        </Row>
    );
};

export default AuthorsList;