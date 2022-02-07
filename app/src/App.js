import React from 'react';
import ContextProvider from './context/UserContext';
import Home from './Home';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from './utils/constants';
import Register from './components/admin/Register';
import Registrations from './components/user/Registrations';
import AddBook from './components/admin/AddBook';
import BooksList from './components/user/BooksList';
import Header from './components/common/Header';
import BookProvider from './context/BookContext';
import AllBooks from './components/user/AllBooks';


function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <ContextProvider>
                    <BookProvider>
                        <Header />
                
                        <Routes>
                            <Route exact path={routes.login} element={<Home />} />

                            <Route exact path={routes.register} element={<Register />} />
                            <Route exact path={routes.addBook} element={<AddBook />} />

                            <Route exact path={routes.yourBooks} element={<Registrations />} />
                            <Route exact path={routes.allBooks} element={<AllBooks />} />
                        </Routes>
                    </BookProvider>
                </ContextProvider>

            </BrowserRouter>
        </div>

    );
}

export default App;
