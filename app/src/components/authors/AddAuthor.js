import React, {useState} from 'react';
// import DayPickerInput from "react-day-picker/DayPickerInput";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addAuthor } from '../../utils/serverCalls';
// import "react-day-picker/lib/style.css";
import Calendar from 'react-calendar';

const AddAuthor = () => {
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [message, setMessage] = useState("");

    const handleAddAuthor = (e) => {
        e.preventDefault();
        console.log(dateOfBirth);
        addAuthor(name, dateOfBirth)
            .then(data => {
                setMessage(data.message);
                setName("");
                setDateOfBirth(null);
            })
            .catch(error => {
                console.log(error);
                // setMessage(error.detail);
            });
    };

    

    return <Form onSubmit={handleAddAuthor}>
        <h2>Add an author</h2>
            
        <Form.Label htmlFor="name" >Name</Form.Label>
        <Form.Control id="name" onChange={e => setName(e.target.value)} value={name}/>

        <Form.Label htmlFor="dob" >Date of birth</Form.Label>
        <Form.Control disabled value={dateOfBirth}/>

        <Calendar id="dob" onChange={setDateOfBirth} value={dateOfBirth} />


        {/* <Form.Control id="cover" onChange={e => setCover(e.target.value)} value={cover} placeholder="https://" /> */}


        <p>{message}</p>
        <Button type="submit">Add author</Button>
    </Form>;
};

export default AddAuthor;