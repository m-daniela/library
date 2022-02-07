import React from 'react';
import ContextProvider from './context/UserContext';
import Home from './Home';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from './utils/constants';
import Register from './components/admin/Register';
import Registrations from './components/admin/Registrations';
import AddBook from './components/admin/AddBook';
import BooksList from './components/common/BooksList';
import Header from './components/common/Header';


function App() {
    return (
        <div className="app">
            <ContextProvider>
                <Header />
                <BrowserRouter>
                    <Routes>
                        <Route exact path={routes.login} element={<Home />} />

                        <Route exact path={routes.register} element={<Register />} />
                        <Route exact path={routes.addBook} element={<AddBook />} />

                        <Route exact path={routes.yourBooks} element={<Registrations />} />
                        <Route exact path={routes.allBooks} element={<BooksList />} />
                    </Routes>
                </BrowserRouter>
            </ContextProvider>
        </div>

    );
}

export default App;
