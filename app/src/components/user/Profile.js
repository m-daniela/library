import React, {useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import ChangePassword from './ChangePassword';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';


const Profile = () => {
    const {user } = useContext(UserContext);

    return (
        <>
            <h2>Your profile</h2>
            <Container className="mb-4 mt-2">
                <Row>
                    <Col xs className="p-0 col-0">
                    Email:
                    </Col>
                    <Col className="col-10">
                        {user.email}
                    </Col>
                </Row>
                <Row >

                    <Col xs className="p-0 col-0">
                    Role:
                    </Col>
                    <Col className="col-10">
                        {user.role}
                    </Col>
                </Row>
                
            </Container>
            <ChangePassword />
        </>
    );
};

export default Profile;