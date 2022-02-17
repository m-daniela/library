import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { updateBook } from '../../utils/serverCalls';

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
    const [message, setMessage] = useState("");
    const [update, setUpdate] = useState(false);
    const [tags, setTags] = useState(book.tags.map(tag => tag.genre));
    const [tag, setTag] = useState("");

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
                    setUpdate(false);
                })
                .catch(error => {
                    setMessage(error.detail);
                });
        }
    };


    const addTags = (e) => {
        e.preventDefault();
        setTags([...tags, tag]);
        setTag("");
    };

    return (
        <div className='book-details homepage'>
            <h2>{book.title}</h2>

            {
                update ? 
                    <form onSubmit={handleUpdateBook}>
                        <label htmlFor="cover" >Cover image</label>
                        <input id="cover" onChange={e => setCover(e.target.value)} value={cover} placeholder="https://" />

                        <label htmlFor="description" >Description</label>
                        <textarea id="description" onChange={e => setDescription(e.target.value)} value={description} rows="4" cols="50"/>

                        <label htmlFor="stock" >Stock</label>
                        <input id="stock" onChange={e => setStock(e.target.value)} value={stock} />
                        <span>{message}</span>
                            
                        <label htmlFor="tags" >Tags</label>
                        {
                            tags.map(tag => <span key={tag}>{tag}</span>)
                        }
                        <input id="tags" onChange={e => setTag(e.target.value)} value={tag} />
                        <button onClick={addTags}>Add tag</button>

                        <button type="submit">Update book</button>
                    </form>
                    :
                    <>
                        <img src={book.cover} alt="img"/>
                        <div className='description'>{book.description}</div>
                    </>
            }
            {user.role == "admin" && <button onClick={() => setUpdate(!update)}>{update ? "Close" : "Update"}</button>}
        </div>
    );
};

export default BookDetails;