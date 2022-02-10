import axios from "axios";
import jwt_decode from "jwt-decode";
import { addBookUrl, checkinUrl, checkoutUrl, getBooksUrl, getRegistrationsUrl, loginUrl, registerUrl } from "./constants";

const authHeaders = () => {
    const token = localStorage.getItem("token");
    return { 
        headers: {"Authorization": `Bearer ${token}`}
    };
}; 

export const userLogin = async (email, password) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    return axios.post(loginUrl, formData)
        .then(response => {
            console.log(response.data);

            // decode the jwt token
            const token_data = jwt_decode(response.data.access_token);

            return {
                email: token_data.sub,
                role: token_data.role, 
                token: response.data.access_token
            };
        })
        .catch(console.log);
};

export const registerUser = async (email, password, role) => {
    const stringRole = role ? "admin" : "user";
    return axios.post(registerUrl, { email, password, role: stringRole }, authHeaders())
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};


export const addBook = async (title, description, cover, stock) => {
    return axios.post(addBookUrl, {title, description, cover, stock }, authHeaders())
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};


export const getBooks = async () => {
    return axios.get(getBooksUrl, authHeaders())
        .then(response => response.data.data)
        .catch(console.log);
};


export const getRegistrations = async (email) => {
    return axios.post(getRegistrationsUrl, {email}, authHeaders())
        .then(response => response.data)
        .catch(console.log);
};

export const checkinBook = async (email, bookId) => {
    return axios.post(checkinUrl, {email, book_id: bookId}, authHeaders())
        .then(response => response.data)
        .catch(console.log);
};

export const checkoutBook = async (email, bookId) => {
    return axios.put(checkoutUrl, {email, book_id: bookId}, authHeaders())
        .then(response => response.data)
        .catch(console.log);
};
