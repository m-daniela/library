/**
 * Book reducer
 * Handles the list of registrations
 * The initialization list is the data
 * fetched from the server
 */


export const actions = {
    load_data: "load_data", 
    checkin: "checkin",
    checkout: "checkout"
};


export const initialization = (books) => {
    return books;
};

export const reducer = (state, action) => {
    if (action.type == actions.load_data){
        return initialization(action.payload);
    }
    else if (action.type == actions.checkin){
        return [...state, action.payload];
    }
    else if (action.type == actions.checkout){
        const stateCopy = state.slice();
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
