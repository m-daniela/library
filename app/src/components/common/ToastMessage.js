import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';


/**
 * Auto hiding notifications toast
 * @returns 
 */
const ToastMessage = ({header, body, showToast}) => {
    const [show, setShow] = useState(showToast);
    return (
        <Toast position="bottom-end" onClose={() => setShow(false)} show={show} delay={2000} autohide>
            <Toast.Header>{header}</Toast.Header>
            <Toast.Body>{body}</Toast.Body>
        </Toast>
    );
};

export default ToastMessage;