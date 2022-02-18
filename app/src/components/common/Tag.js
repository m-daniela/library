import React from 'react';
import Badge from 'react-bootstrap/Badge';

const Tag = ({tag, removeButtonText, onDelete}) => {
    return (
        <Badge bg="danger" title={`${removeButtonText}: ${tag.name}`} onClick={onDelete}>
            {tag.name}
        </Badge>
    );
};

export default Tag;