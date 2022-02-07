
export const routes = {
    login: "/", 
    adminHome: "/admin", 
    userHome: "/user", 

    register: "/register", 
    addBook: "/add",

    yourBooks: "/your-books", 
    allBooks: "/books"


};


const baseUrl = "http://localhost:8000/";

export const loginUrl = `${baseUrl}login`;
export const registerUrl = `${baseUrl}register`;
export const getBooksUrl = `${baseUrl}books`;
export const addBookUrl = `${baseUrl}book`;
export const checkinUrl = `${baseUrl}checkin`;
export const checkoutUrl = `${baseUrl}checkout`;
export const getRegistrationsUrl = `${baseUrl}registrations`;

