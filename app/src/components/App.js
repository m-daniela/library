import React from 'react';
import UserProvider from '../context/UserContext';
import Home from './Home';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from '../utils/constants';
import BookProvider from '../context/BookContext';
import SocketProvider from '../context/SocketContext';
import ChatProvider from '../context/ChatContext';
import Header from "./common/Header";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import ChatRoute from "./routes/ChatRoute";
import AddBook from './books/AddBook';
import Register from "./admin/Register";
import Registrations from "./registrations/Registrations";
import AllBooks from "./books/AllBooks";
import BookDetails from './books/BookDetails';
import Report from "./registrations/Report";
import Profile from './user/Profile';
import UserRegistrations from "./registrations/UserRegistrations";
import AddAuthor from './authors/AddAuthor';
import Authors from './authors/Authors';
import AuthorDetails from './authors/AuthorDetails';

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
                            <ChatProvider>
                                <Header />
                
                                <div className='homepage col-xl-12'>

                                
                                    <Routes>
                                        <Route exact path={routes.login} element={<Home />} />

                                        <Route exact path={routes.addBook} element={
                                            <AdminRoute>
                                                <AddBook/>
                                            </AdminRoute>
                                        }/>

                                        <Route exact path={routes.addAuthor} element={
                                            <AdminRoute>
                                                <AddAuthor/>
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

                                        <Route exact path={routes.authorDetails} element={
                                            <UserRoute>
                                                <AuthorDetails />
                                            </UserRoute>
                                        } />

                                        <Route exact path={routes.report} element={
                                            <UserRoute>
                                                <Report />
                                            </UserRoute>
                                        } />

                                        <Route exact path={routes.profile} element={
                                            <UserRoute>
                                                <Profile />
                                            </UserRoute>
                                        } />


                                        <Route exact path={routes.chat} element={
                                            <ChatRoute />
                                        } />

                                        <Route exact path={routes.authors} element={
                                            <UserRoute>
                                                <Authors/>
                                            </UserRoute>
                                        }/>

                                    </Routes>
                                </div>
                            </ChatProvider>
                        </SocketProvider>
                    </BookProvider>
                </UserProvider>

            </BrowserRouter>
        </div>

    );
}

export default App;
