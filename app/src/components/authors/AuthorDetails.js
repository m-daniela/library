import React, { useContext, useState } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Calendar from 'react-calendar';
import { updateAuthor } from '../../utils/serverCalls';


const AuthorDetails = () => {
    const {user} = useContext(UserContext);
    const {state} = useLocation();
    const author = state.author;
    const [update, setUpdate] = useState(false);
    const [name, setName] = useState(author.name);
    const [dateOfBirth, setDateOfBirth] = useState(new Date(author.date_of_birth));

    const handleUpdateAuthor = (e) => {
        e.preventDefault();
        updateAuthor(author.id, name, dateOfBirth)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            {
                update ?
                    <Form onSubmit={handleUpdateAuthor}>
                        <Form.Label htmlFor="name" >Name</Form.Label>
                        <Form.Control id="name" onChange={e => setName(e.target.value)} value={name} />

                        <Form.Label htmlFor="dob" >Date of birth</Form.Label>
                        <Form.Control disabled value={dateOfBirth} />
                        <Calendar id="dob" onChange={setDateOfBirth} value={dateOfBirth} />

                        <ButtonGroup className="my-4">
                            <Button type="submit">Update Author</Button>
                            <Button onClick={() => setUpdate(!update)} variant="secondary">Close</Button>
                        </ButtonGroup>
               

                    </Form>
                    :
                    <>
                        <h2>{author.name}</h2>
                        <span>{author.date_of_birth}</span>
                        {
                            user.role === "admin" && <Button onClick={() => setUpdate(!update)}>Update</Button>
                        }
                    </>
            }
            
            
        </div>
    );
};

export default AuthorDetails;