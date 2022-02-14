import axios from "axios";
import jwt_decode from "jwt-decode";
import { addBookUrl, changePasswordUrl, 
    checkinUrl, checkoutUrl, getBooksUrl, 
    getFilteredBooksUrl, getFilteredRegistrationsUrl, 
    getRaport, getRegistrationsUrl, loginUrl, registerUrl } from "./constants";

/** 
 * authentication header with the bearer token 
 * this is necessary to perform the requests
 */
const authHeaders = (token) => {
    if (!token){
        token = localStorage.getItem("token");
    }
    return { 
        headers: {"Authorization": `Bearer ${token}`}
    };
}; 

/**
 * login 
 * send the username and password parameters 
 * as form data, so they can be handled by oauth2
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
export const userLogin = async (email, password) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    return axios.post(loginUrl, formData)
        .then(response => {
            // decode the jwt token
            const token_data = jwt_decode(response.data.access_token);

            return {
                email: token_data.sub,
                role: token_data.role, 
                token: response.data.access_token
            };
        })
        .catch(error => {
            throw error.response.data;
        });
};


/**
 * register user
 * register a new user with the given email,
 * password and role
 * @param {string} email 
 * @param {string} password 
 * @param {boolean} role 
 * @returns 
 */
export const registerUser = async (email, password, role) => {
    const stringRole = role ? "admin" : "user";
    return axios.post(registerUrl, { email, password, role: stringRole }, authHeaders())
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};


/**
 * change password
 * @param {string} email 
 * @param {string} password 
 * @param {string} newPassword 
 * @returns 
 */
export const changePassword = async (email, password, newPassword) => {
    return axios.post(changePasswordUrl, { user: {email, password}, new_password: newPassword }, authHeaders())
        .then(response => response.data)
        .catch(error => {
            throw error.response.data.detail;
        });
};

/**
 * add book
 * @param {string} title 
 * @param {string} description 
 * @param {string} cover 
 * @param {int} stock 
 * @returns 
 */
export const addBook = async (title, description, cover, stock) => {
    return axios.post(addBookUrl, {title, description, cover, stock }, authHeaders())
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};

/**
 * get books
 * @returns 
 */
export const getBooks = async () => {
    return axios.get(getBooksUrl, authHeaders())
        .then(response => response.data.data)
        .catch(error => {
            throw error.response.data;
        });
};

/**
 * get the books based on the query 
 * @param {string} query 
 * @returns 
 */
export const getFilteredBooks = async (query, order, sort, filter) => {
    return axios.get(getFilteredBooksUrl(query, order, sort, filter), authHeaders())
        .then(response => {
            console.log(response.data);
            return response.data.data;
        })
        .catch(error => {
            throw error.response.data;
        });
};



/**
 * get the registrations for the given user
 * added the token directly because it might 
 * take a while to retrieve it from the local 
 * storage and this function is called on login
 * @param {string} email 
 * @param {string} token 
 * @returns 
 */
export const getRegistrations = async (email, token) => {
    return axios.post(getRegistrationsUrl, {email}, authHeaders(token))
        .then(response => {
            // console.log(response.data);
            return response.data;
        })
        .catch(error => {
            throw error.response.data;
        });
};

/**
 * get the filtered registrations
 * for the given user
 * @param {string} email 
 * @param {string} query 
 * @param {string} order 
 * @param {string} sort 
 * @returns 
 */
export const getFilteredRegistrations = async (email, query, order, sort, filter) => {
    return axios.post(getFilteredRegistrationsUrl(query, order, sort, filter), {email}, authHeaders())
        .then(response => {
            // console.log(response);
            return response.data;
        })
        .catch(error => {
            throw error.response;
        });
};



export const getUserRaport = async (email) => {
    return axios.post(getRaport, {email}, authHeaders())
        .then(response => {
            // console.log(response.data);
            return response.data;
        })
        .catch(error => {
            throw error.response.data;
        });
};



/**
 * checkin book
 * @param {string} email 
 * @param {int} bookId 
 * @returns 
 */
export const checkinBook = async (email, bookId) => {
    return axios.post(checkinUrl, {email, book_id: bookId}, authHeaders())
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};

/**
 * checkout book
 * @param {string} email 
 * @param {int} bookId 
 * @returns 
 */
export const checkoutBook = async (email, bookId) => {
    return axios.put(checkoutUrl, {email, book_id: bookId}, authHeaders())
        .then(response => response.data)
        .catch(error => {
            throw error.response.data;
        });
};
