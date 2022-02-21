

export const routes = {
    login: "/", 
    chat: "/chat", 
    profile: "/profile",

    register: "/register", 
    addBook: "/add",
    userRegistrations: "/registrations",
    
    yourBooks: "/your-books", 
    allBooks: "/books",
    details: "/details/:id",
    report: "/report",

    addAuthor: "/author",
};

export const detailsRoute = (id) => `/details/${id}`;


const host = "localhost";
const port = 5000;
const baseUrl = `http://${host}:${port}/`;

export const socketUrl = `ws://${host}:${port}`;



export const loginUrl = `${baseUrl}token`;
export const registerUrl = `${baseUrl}register`;
export const changePasswordUrl = `${baseUrl}change-password`;


export const getBooksUrl = (page=1) => `${baseUrl}books?page=${page}`;
export const getFilteredBooksUrl = (query="", order="", sort="asc", filter="", page=1) => `${baseUrl}books?q=${query}&order=${order}&sorting=${sort}&filter=${filter}&page=${page}`;
export const addBookUrl = `${baseUrl}book`;
export const updateBookUrl = (bookId) => `${baseUrl}book/${bookId}`;
export const getTagsUrl = (search) => `${baseUrl}tags?search=${search}`;


export const checkinUrl = `${baseUrl}checkin`;
export const checkoutUrl = `${baseUrl}checkout`;
export const getRegistrationsUrl = `${baseUrl}registrations`;
export const getFilteredRegistrationsUrl = (query="", order="", sort="asc", filter="") => `${baseUrl}registrations?q=${query}&order=${order}&sorting=${sort}&filter=${filter}`;
export const getReport = `${baseUrl}report`;
export const deleteRegistrationUrl = `${baseUrl}delete-registration`;


export const getChatsUrl = `${baseUrl}chats`;
export const getMessagesUrl = `${baseUrl}messages`;
export const addMessageUrl = `${baseUrl}message`;


export const addAuthorUrl = `${baseUrl}author`;



export const convertDate = (timestamp) => {
    const time = new Date(timestamp);
    return time.toLocaleString("ro-RO");
};