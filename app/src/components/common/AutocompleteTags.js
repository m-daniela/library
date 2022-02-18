import React, { useState } from 'react';
import { getSuggestedTags } from '../../utils/serverCalls';
import Autosuggest from "react-autosuggest";

const AutocompleteTags = () => {
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    

    const handleOnChange = (e, {newValue}) => {
        setValue(newValue);
    };

    const getSuggestionValue = (suggestion) => {
        return suggestion.genre;
    };

    const renderSuggestion = (suggestion) => {
        console.log(suggestion);
        return <span>{suggestion.name}</span>;
    };

    const fetchSuggestions = ({value}) => {
        getSuggestedTags(value)
            .then(data => {
                console.log(data);
                setSuggestions(data);
            });
    };

    const clearSuggestions = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: "Search for tags", 
        value,
        onChange: handleOnChange
    };

    return (
        <>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={fetchSuggestions}
                onSugggestionsClearRequested={clearSuggestions}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        </>
        
    );
};

export default AutocompleteTags;