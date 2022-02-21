/**
 * Book reducer
 * Handles the list of registrations
 * The initialization list is the data
 * fetched from the server
 */


export const bookActions = {
    loadData: "load_data", 
    checkin: "checkin",
    checkout: "checkout", 
    isLoading: "loading"
};


export const initialState = {
    books: [], 
    isLoading: false
};

export const initialization = (books) => {
    return books;
};

export const reducer = (state, action) => {
    if (action.type == bookActions.loadData){
        return initialization(action.payload);
    }
    else if(action.type == bookActions.isLoading){
        //
    }
    else if (action.type == bookActions.checkin){
        return [...state, action.payload];
    }
    else if (action.type == bookActions.checkout){
        const stateCopy = state.slice();
        console.log(action.payload);
        const newState = stateCopy.map(registration => {
            if (registration.book_id == action.payload.book_id && registration.email == action.payload.email){
                registration.checkout = action.payload.checkout;
            }
            return registration;
        });
        return newState;
    }
    else{
        return state;
    }

};
