import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { bookActions, initialState, reducer } from '../reducers/bookReducer';
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
    const [myBooks, dispatch] = useReducer(reducer, initialState);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user !== null){
            getRegistrations(user.email, user.token)
                .then(data => {
                    if (data?.length){
                        dispatch({type: bookActions.loadData, payload: data});
                    }
                    else{
                        dispatch({type: bookActions.loadData, payload: []});
                    }
                })
                .catch(error => {
                    console.log(error);
                    dispatch({type: bookActions.loadData, payload: []});
                });
        }
    }, [user]);

    const retrieveBooks = async (page=1) => {
        return getBooks(page)
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
