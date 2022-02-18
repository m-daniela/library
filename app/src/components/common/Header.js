import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext';
import { UserContext } from '../../context/UserContext';
import { chatActions } from '../../reducers/chatReducer';
import { routes } from '../../utils/constants';
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";

const Header = () => {
    const {user, logout} = useContext(UserContext);
    const {dispatch} = useContext(ChatContext);

    // clear the chat messages before logout
    const handleLogout = () => {
        dispatch({type: chatActions.clear});
        logout();
    };
    


    return <Navbar collapseOnSelect expand="lg">
        <Container>
            <Link to={routes.login}>Library</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            
            <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
                {user && <>
                    <Link to={routes.chat}>Chat</Link>
                    <Link to={routes.profile}>{user.email}</Link>
                    <Link to={routes.login} onClick={handleLogout}>Logout</Link>
                </>}
            </Navbar.Collapse>
        </Container>
    </Navbar>;

};

export default Header;
