import React from 'react';
import UserProvider from '../context/UserContext';
import Home from './Home';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from '../utils/constants';
import Register from './admin/Register';
import Registrations from './user/Registrations';
import AddBook from './admin/AddBook';
import Header from './common/Header';
import BookProvider from '../context/BookContext';
import AllBooks from './user/AllBooks';
import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';


function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <UserProvider>
                    <BookProvider>
                        <Header />
                
                        <Routes>
                            <Route exact path={routes.login} element={<Home />} />

                            <Route exact path={routes.addBook} element={
                                <AdminRoute>
                                    <AddBook/>
                                </AdminRoute>
                            }/>

                            <Route exact path={routes.register} element={
                                <AdminRoute>
                                    <Register/>
                                </AdminRoute>
                                
                            }/>

                            <Route exact path={routes.yourBooks} element={
                                <UserRoute>
                                    <Registrations />
                                </UserRoute>
                            } />

                            <Route exact path={routes.allBooks} element={
                                <UserRoute>
                                    <AllBooks />
                                </UserRoute>
                            } />
                        </Routes>
                    </BookProvider>
                </UserProvider>

            </BrowserRouter>
        </div>

    );
}

export default App;
