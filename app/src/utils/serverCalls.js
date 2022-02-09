import axios from "axios";
import { addBookUrl, checkinUrl, checkoutUrl, getBooksUrl, getRegistrationsUrl, loginUrl, registerUrl } from "./constants";


export const userLogin = async (email, password) => {
    return axios.post(loginUrl, { email, password })
        .then(response => response.data)
        .catch(console.log);
};

export const registerUser = async (email, password, role) => {
    const stringRole = role ? "admin" : "user";
    return axios.post(registerUrl, { email, password, role: stringRole })
        .then(response => response.data)
        .catch(console.log);
};


export const addBook = async (title, description, cover, stock) => {
    return axios.post(addBookUrl, {title, description, cover, stock })
        .then(response => response.data)
        .catch(console.log);
};


export const getBooks = async () => {
    return axios.get(getBooksUrl)
        .then(response => response.data)
        .catch(console.log);
};


export const getRegistrations = async (email) => {
    return axios.post(getRegistrationsUrl, {email})
        .then(response => response.data.registrations.books)
        .catch(console.log);
};

export const checkinBook = async (email, bookId) => {
    return axios.post(checkinUrl, {email, book_id: bookId})
        .then(response => response.data)
        .catch(console.log);
};

export const checkoutBook = async (email, bookId) => {
    return axios.put(checkoutUrl, {email, book_id: bookId})
        .then(response => response.data)
        .catch(console.log);
};
