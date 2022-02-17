import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { actions, reducer } from '../reducers/bookReducer';
import { getBooks, getRegistrations } from '../utils/serverCalls';
import { UserContext } from './UserContext';


/**
 * Book context
 * Holds the list of borrowed books and 
 * the list of available books
 */
export const BookContext = createContext();


const BookProvider = ({children}) => {
    const [books, setBooks] = useState([]);
    const [myBooks, dispatch] = useReducer(reducer, []);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user !== null){
            getRegistrations(user.email, user.token)
                .then(data => {
                    if (data?.length){
                        dispatch({type: actions.load_data, payload: data});
                    }
                    else{
                        dispatch({type: actions.load_data, payload: []});
                    }
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

    return <BookContext.Provider value={{books, retrieveBooks, myBooks, dispatch}}>
        {children}
    </BookContext.Provider>;
};

export default BookProvider;
