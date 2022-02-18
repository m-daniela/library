import React from 'react';

const Suggestion = ({item, query}) => {
    return (
        <span id={item.id} className={item.name === query ? 'match' : 'no-match'}>
            {item.name}11111
        </span>
    );
};

export default Suggestion;