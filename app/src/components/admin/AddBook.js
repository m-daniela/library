import React, { useState, createRef } from 'react';
import ReactTags from 'react-tag-autocomplete';
import { addBook, getSuggestedTags } from '../../utils/serverCalls';


/**
 * Add a new book
 * Add the title, description stock, cover image
 * and tags
 */
const AddBook = () => {
    const [cover, setCover] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(1);
    const [tags, setTags] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [message, setMessage] = useState("");
    const reactTags = createRef();

    const handleAddBook = (e) => {
        e.preventDefault();
        if (stock < 1){
            setMessage("The stock must be greater than 1");
        }
        else {
            addBook(title, description, cover, stock, tags)
                .then(data => {
                    setMessage(data.message);
                    setTitle("");
                    setDescription("");
                    setStock(1);
                    setCover("");
                    setTags([]);
                })
                .catch(error => {
                    console.log(error);
                    // setMessage(error.detail);
                });
        }
    };

    

    const onDelete = (i) => {
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
                // const suggestionList = data.map(suggestion => ({id: suggestion.id, name: suggestion.genre}));
                // console.log(suggestionList);
                setSuggestions(data);
            });
    };

    return <div className="homepage">
        <h2>Add a new book</h2>
        <form onSubmit={handleAddBook}>
            <label htmlFor="title" >Title</label>
            <input id="title" onChange={e => setTitle(e.target.value)} value={title} />
            
            <label htmlFor="description" >Description</label>
            <textarea id="description" onChange={e => setDescription(e.target.value)} value={description} rows="4" cols="50"/>

            <label htmlFor="stock" >Stock</label>
            <input id="stock" onChange={e => setStock(e.target.value)} value={stock} />

            <label htmlFor="cover" >Cover image</label>
            <input id="cover" onChange={e => setCover(e.target.value)} value={cover} placeholder="https://" />

            <label htmlFor="tags" >Tags</label>
            <ReactTags
                ref={reactTags}
                tags={tags}
                suggestions={suggestions}
                onDelete={onDelete}
                onAddition={onAddition}
                onInput={onInput}
                allowNew={true} />

            <p>{message}</p>
            <button type="submit">Add book</button>
        </form>
    </div>;
};

export default AddBook;
