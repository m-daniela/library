import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { authorRoute } from '../../utils/constants';

const Author = ({author}) => {
    return (
        <Col className="author col-3">
            <Link to={authorRoute(author.id)} state={{author}}>{author.name}</Link>
        </Col>
    );
};

export default Author;