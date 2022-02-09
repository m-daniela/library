
export const routes = {
    login: "/", 
    adminHome: "/admin", 
    userHome: "/user", 

    register: "/register", 
    addBook: "/add",

    yourBooks: "/your-books", 
    allBooks: "/books"
};


const port = 5000;
const baseUrl = `http://localhost:${port}/`;

export const loginUrl = `${baseUrl}login`;
export const registerUrl = `${baseUrl}register`;
export const getBooksUrl = `${baseUrl}books`;
export const addBookUrl = `${baseUrl}book`;
export const checkinUrl = `${baseUrl}checkin`;
export const checkoutUrl = `${baseUrl}checkout`;
export const getRegistrationsUrl = `${baseUrl}registrations`;
// export const getRegistrationsUrl = (email) => `${baseUrl}registrations/${email}`;


export const convertDate = (timestamp) => new Date(timestamp).toString();