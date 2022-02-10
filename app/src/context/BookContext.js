import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { actions, reducer } from '../reducers/bookReducer';
import { getBooks, getRegistrations } from '../utils/serverCalls';
import { UserContext } from './UserContext';

export const BookContext = createContext();


const BookProvider = ({children}) => {
    const [books, setBooks] = useState([]);
    // const [myBooks, setMyBooks] = useState([]);
    const [myBooks, dispatch] = useReducer(reducer, []);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user !== null){
            getRegistrations(user.email, user.token)
                .then(data => {
                    dispatch({type: actions.load_data, payload: data});
                })
                .catch(error => {
                    console.log(error);
                    dispatch({type: actions.load_data, payload: []});
                });
        }
    }, [user]);

    const retrieveBooks = () => {
        getBooks()
            .then(data => {
                setBooks(data);
            })
            .catch(error => {
                console.log(error);
                setBooks([]);
            });
    };

    // const retrieveMyBooks = (email) => {
        
    // };

    return <BookContext.Provider value={{books, retrieveBooks, myBooks, dispatch}}>
        {children}
    </BookContext.Provider>;
};

export default BookProvider;
