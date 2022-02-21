import React from 'react';
import { Row, Spinner } from 'react-bootstrap';
import Author from './Author';

/**
 * Authors list
 * Map each author to the Author component
 * @param {*} param0 
 * @returns 
 */
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