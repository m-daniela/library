

export const routes = {
    login: "/", 
    chat: "/chat", 
    changePassword: "/change-password",

    register: "/register", 
    addBook: "/add",
    userRegistrations: "registrations",
    
    yourBooks: "/your-books", 
    allBooks: "/books",
    details: "/details/:id",
    report: "/report",
};

export const detailsRoute = (id) => `/details/${id}`;


const host = "localhost";
const port = 5000;
const baseUrl = `http://${host}:${port}/`;

export const socketUrl = `ws://${host}:${port}`;



export const loginUrl = `${baseUrl}token`;
export const registerUrl = `${baseUrl}register`;
export const getBooksUrl = `${baseUrl}books`;
export const getFilteredBooksUrl = (query="", order="", sort="asc", filter="") => `${baseUrl}books?q=${query}&order=${order}&sorting=${sort}&filter=${filter}`;
export const addBookUrl = `${baseUrl}book`;
export const updateBookUrl = (bookId) => `${baseUrl}book/${bookId}`;
export const checkinUrl = `${baseUrl}checkin`;
export const checkoutUrl = `${baseUrl}checkout`;
export const getRegistrationsUrl = `${baseUrl}registrations`;
export const getFilteredRegistrationsUrl = (query="", order="", sort="asc", filter="") => `${baseUrl}registrations?q=${query}&order=${order}&sorting=${sort}&filter=${filter}`;
export const getReport = `${baseUrl}report`;
export const changePasswordUrl = `${baseUrl}change-password`;
export const deleteRegistrationUrl = `${baseUrl}delete-registration`;
export const getChatsUrl = `${baseUrl}chats`;
export const addMessageUrl = `${baseUrl}message`;



export const convertDate = (timestamp) => {
    const time = new Date(timestamp);
    return time.toLocaleString("ro-RO");
};