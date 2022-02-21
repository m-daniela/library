import React, { useState, createRef } from 'react';
import ReactTags from 'react-tag-autocomplete';
import { addBook, getAuthors, getSuggestedTags } from '../../utils/serverCalls';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tag from '../common/Tag';
import Suggestion from '../common/Suggestion';


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
    const [authors, setAuthors] = useState([]);
    const [authorSuggestions, setAuthorSuggestions] = useState([]);
    const [message, setMessage] = useState("");
    const reactTags = createRef();
    const reactAuthors = createRef();

    const handleAddBook = (e) => {
        e.preventDefault();
        if (stock < 1){
            setMessage("The stock must be greater than 1");
        }
        else {
            addBook(title, description, cover, stock, tags, authors)
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

    

    const onDeleteTag = (i) => {
        const newTags = tags.slice(0);
        newTags.splice(i, 1);
        setTags(newTags);
    };

    const onAdditionTag = (tag) => {
        console.log(tag);
        setTags([...tags, tag]);
    };

    const onInputTag = (query) => {
        getSuggestedTags(query)
            .then(data => {
                console.log(data);
                setSuggestions(data);
            });
    };

    const onDeleteAuthor = (i) => {
        const newAuthors = authors.slice(0);
        newAuthors.splice(i, 1);
        setAuthors(newAuthors);
    };

    const onAdditionAuthor = (author) => {
        console.log(author);
        setAuthors([...authors, author]);
    };

    const onInputAuthor = (query) => {
        getAuthors(query)
            .then(data => {
                console.log(data);
                setAuthorSuggestions(data);
            });
    };

    return <Form onSubmit={handleAddBook}>
        <h2>Add a new book</h2>
        <Form.Label htmlFor="title" >Title</Form.Label>
        <Form.Control id="title" onChange={e => setTitle(e.target.value)} value={title} />
        
        <Form.Label htmlFor="description" >Description</Form.Label>
        <Form.Control as="textarea" id="description" onChange={e => setDescription(e.target.value)} value={description} rows="4" cols="50"/>

        <Form.Label htmlFor="stock" >Stock</Form.Label>
        <Form.Control id="stock" onChange={e => setStock(e.target.value)} value={stock} />

        <Form.Label htmlFor="authors" >Authors</Form.Label>

        <ReactTags
            classNames={
                {root: "form-control"}
            }
            ref={reactAuthors}
            tags={authors}
            suggestions={authorSuggestions}
            onDelete={onDeleteAuthor}
            onAddition={onAdditionAuthor}
            onInput={onInputAuthor}
            tagComponent={Tag}
            suggeestionComponent={Suggestion} />

        <Form.Label htmlFor="cover" >Cover image</Form.Label>
        <Form.Control id="cover" onChange={e => setCover(e.target.value)} value={cover} placeholder="https://" />

        <Form.Label htmlFor="tags" >Tags</Form.Label>

        <ReactTags
            classNames={
                {root: "form-control"}
            }
            ref={reactTags}
            tags={tags}
            suggestions={suggestions}
            onDelete={onDeleteTag}
            onAddition={onAdditionTag}
            onInput={onInputTag}
            allowNew={true}
            tagComponent={Tag}
            suggeestionComponent={Suggestion} />

        <p>{message}</p>
        <Button type="submit">Add book</Button>
    </Form>;
};

export default AddBook;
