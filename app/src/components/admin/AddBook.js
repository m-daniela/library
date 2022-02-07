import React, { useState } from 'react';
import { addBook } from '../../utils/serverCalls';


/**
 * Add a new book
 * Add the title, description stock and cover image
 * TODO: handle the cover
 */
const AddBook = () => {
    // will change cover to image 
    const [cover, setCover] = useState("img");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(1);
    const [message, setMessage] = useState("");

    const handleAddBook = (e) => {
        e.preventDefault();
        if (stock < 1){
            setMessage("The stock must be greater than 1");
        }
        else {
            addBook(title, description, cover, stock)
                .then(data => {
                    setMessage(data.message);
                    setTitle("");
                    setDescription("");
                    setStock(1);
                })
                .catch(setMessage);
        }
    };

    return <div className="register">
        <h2>Register a new user</h2>
        <form onSubmit={handleAddBook}>
            <label htmlFor="title" >Title</label>
            <input id="title" onChange={e => setTitle(e.target.value)} value={title} />
            
            <label htmlFor="description" >Description</label>
            <textarea id="description" onChange={e => setDescription(e.target.value)} value={description} rows="4" cols="50"/>

            <label htmlFor="stock" >Stock</label>
            <input id="stock" onChange={e => setStock(e.target.value)} value={stock} />

            <p>{message}</p>
            <button type="submit">Add book</button>
        </form>
    </div>;
};

export default AddBook;
