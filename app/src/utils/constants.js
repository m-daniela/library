

export const routes = {
    login: "/", 
    changePassword: "/change-password",

    register: "/register", 
    addBook: "/add",
    
    yourBooks: "/your-books", 
    allBooks: "/books",
    details: "/details/:id",
    report: "/report",
};

export const detailsRoute = (id) => `/details/${id}`;

const port = 5000;
const baseUrl = `http://localhost:${port}/`;

export const loginUrl = `${baseUrl}token`;
export const registerUrl = `${baseUrl}register`;
export const getBooksUrl = `${baseUrl}books`;
export const getFilteredBooksUrl = (query="", order="", sort="asc", filter="") => `${baseUrl}books?q=${query}&order=${order}&sorting=${sort}&filter=${filter}`;
export const addBookUrl = `${baseUrl}book`;
export const checkinUrl = `${baseUrl}checkin`;
export const checkoutUrl = `${baseUrl}checkout`;
export const getRegistrationsUrl = `${baseUrl}registrations`;
export const getFilteredRegistrationsUrl = (query="", order="", sort="asc", filter="") => `${baseUrl}registrations?q=${query}&order=${order}&sorting=${sort}&filter=${filter}`;
export const getReport = `${baseUrl}report`;
export const changePasswordUrl = `${baseUrl}change-password`;


export const convertDate = (timestamp) => {
    const time = new Date(timestamp);
    return time.toLocaleString("ro-RO", { timeZone: 'UTC' });
};