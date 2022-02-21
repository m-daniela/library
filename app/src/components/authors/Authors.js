import React, { useState, useEffect } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { getAuthors } from '../../utils/serverCalls';
import Author from './Author';

const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAuthors()
            .then(data => {
                console.log(data);
                if (data){
                    setAuthors(data.data);

                }
            })
            .catch(error => {
                console.log(error);
                setAuthors([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <Row>
            {
                isLoading ? 
                    <Spinner animation="grow" />
                    :
                    <>{authors?.map(author => <Author key={author.id} author={author}/>)}</>
            }
            
        </Row>
    );
};

export default Authors;