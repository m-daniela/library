import axios from "axios";
import { getRegistrationsUrl, loginUrl, registerUrl } from "./constants";


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


export const getBooks = async () => {
    return axios.get(loginUrl)
        .then(response => response.data)
        .catch(console.log);
};


export const getRegistrations = async (email) => {
    return axios.get(getRegistrationsUrl, { email })
        .then(response => response.data)
        .catch(console.log);
};


