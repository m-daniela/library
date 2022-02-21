import React, { createRef, useContext, useState } from 'react';
import ReactTags from 'react-tag-autocomplete';

import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { getSuggestedTags, updateBook } from '../../utils/serverCalls';
import { Badge, Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Tag from '../common/Tag';
import Suggestion from '../common/Suggestion';


/**
 * Book details
 * Display the details about the book (title, description, cover
 * image) on another page
 * @returns 
 */
const BookDetails = () => {
    const {state} = useLocation();
    const book = state.book;

    const {user} = useContext(UserContext);

    const [cover, setCover] = useState(book.cover);
    const [description, setDescription] = useState(book.description);
    const [stock, setStock] = useState(book.stock);
    const [update, setUpdate] = useState(false);
    const [tags, setTags] = useState(book.tags);
    const [suggestions, setSuggestions] = useState([]);
    const [message, setMessage] = useState("");
    const reactTags = createRef();

    const handleUpdateBook = (e) => {
        e.preventDefault();
        if (stock < 1){
            setMessage("The stock must be greater than 1");
        }
        else {
            updateBook(book.id, description, cover, stock, tags)
                .then(data => {
                    setMessage(data.message);
                    setDescription("");
                    setStock(1);
                    setCover("");
                    setTags([]);

                    setUpdate(false);
                })
                .catch(error => {
                    setMessage(error.detail);
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

    return (
        <div className='book-details'>
            <h2>{book.title}</h2>

            {
                update ? 
                    <Form onSubmit={handleUpdateBook}>
                        <Form.Label htmlFor="cover" >Cover image</Form.Label>
                        <Form.Control id="cover" onChange={e => setCover(e.target.value)} value={cover} placeholder="https://" />

                        <Form.Label htmlFor="description" >Description</Form.Label>
                        <Form.Control as="textarea" id="description" onChange={e => setDescription(e.target.value)} value={description} rows="4" cols="50"/>

                        <Form.Label htmlFor="stock" >Stock</Form.Label>
                        <Form.Control id="stock" onChange={e => setStock(e.target.value)} value={stock} />
                        <span>{message}</span>
                            
                        <Form.Label htmlFor="tags" >Tags</Form.Label>
                        
                        <ReactTags
                            classNames={
                                {root: "form-control"}
                            }
                            ref={reactTags}
                            tags={tags}
                            suggestions={suggestions}
                            onDelete={onDelete}
                            onAddition={onAddition}
                            onInput={onInput}
                            allowNew={true}
                            tagComponent={Tag}
                            suggeestionComponent={Suggestion} />

                        <ButtonGroup className="my-4">
                            <Button type="submit">Update book</Button>
                            <Button onClick={() => setUpdate(!update)} variant="secondary">{update ? "Close" : "Update"}</Button>
                        </ButtonGroup>
                       

                    </Form>
                    :
                    <Row className='mx-auto'>
                        <Col xs="auto" className='mx-auto'>
                            <img src={book.cover} alt="img"/>
                        </Col>
                        <Col className='details'>
                            <div className='tags'>{book.tags.map(tag => <Badge key={tag.id} bg="danger">{tag.name}</Badge>)}</div>
                            <div className='description'>{book.description}</div>
                            <span>In stock: {book.stock}</span>
                            {message.length !== 0 && <span>{message}</span>}
                            {user.role == "admin" && <Button onClick={() => setUpdate(!update)}>{update ? "Close" : "Update"}</Button>}
                        </Col>
                    </Row>
            }
        </div>
    );
};

export default BookDetails;