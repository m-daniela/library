import React, { createRef, useState } from 'react';
import { getSuggestedTags } from '../../utils/serverCalls';
import ReactTags from "react-tag-autocomplete";

const Autocomplete = () => {
    const [tags, setTags] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const reactTags = createRef();

    const onDelete = (i) => {
        console.log(i);

        const newTags = tags.slice(0);
        newTags.splice(i, 1);
        setTags(newTags);
    };

    const onAddition = (tag) => {
        console.log(tag);
        setTags([...tags, tag]);
    };

    const onInput = (query) => {
        getSuggestedTags(query)
            .then(data => {
                console.log(data);
                const suggestionList = data.map(suggestion => ({id: suggestion.id, name: suggestion.genre}));
                console.log(suggestionList);
                setSuggestions(suggestionList);
            });
    };

    return (
        <ReactTags
            ref={reactTags}
            tags={tags}
            suggestions={suggestions}
            onDelete={onDelete}
            onAddition={onAddition}
            onInput={onInput} />
    );
};

export default Autocomplete;