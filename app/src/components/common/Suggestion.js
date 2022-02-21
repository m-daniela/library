import React from 'react';

const Suggestion = ({item, query}) => {
    return (
        <span id={item.id} className={item.name === query ? 'match' : 'no-match'}>
            {item.name}
        </span>
    );
};

export default Suggestion;