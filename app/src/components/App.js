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
import BookDetails from './common/BookDetails';
import ChangePassword from './user/ChangePassword';
import Report from './common/Report';
import UserRegistrations from './admin/UserRegistrations';
import Chat from './common/Chat';
import ChatProvider from '../context/ChatContext';
import ContactProvider from '../context/ContactContext';
import ContactChat from './contact/ContactChat';
import ContactRoute from './routes/ContactRoute';
import SocketProvider from '../context/SocketContext';

/**
 * Main component
 * Contains the routing logic and contexts
 * @returns 
 */
function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <UserProvider>
                    <BookProvider>
                        <SocketProvider>
                            <ContactProvider>
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

                                    <Route exact path={routes.userRegistrations} element={
                                        <AdminRoute>
                                            <UserRegistrations/>
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

                                    <Route exact path={routes.details} element={
                                        <UserRoute>
                                            <BookDetails />
                                        </UserRoute>
                                    } />

                                    <Route exact path={routes.report} element={
                                        <UserRoute>
                                            <Report />
                                        </UserRoute>
                                    } />

                                    <Route exact path={routes.changePassword} element={
                                        <UserRoute>
                                            <ChangePassword />
                                        </UserRoute>
                                    } />


                                    <Route exact path={routes.chat} element={
                                        <ContactRoute />
                                    } />

                                </Routes>
                            </ContactProvider>
                        </SocketProvider>
                    </BookProvider>
                </UserProvider>

            </BrowserRouter>
        </div>

    );
}

export default App;
