
/**
 * Chat reducer
 * Holds all the chats for the 
 * contact account
 * 
 * data:
 * 
 * chats = {
 *  email1: {
 *      messages: [{}, {}, {}]
 * }, 
 *  email2: {
 *      messages: [{}]
 * }, ...
 * }
 */

export const chatActions = {
    addMessage: "add_message", 
    addChat: "add_chat"
};

export const initialState = {};

export const reducer = (state, action) => {
    if (action.type == chatActions.addChat){
        const currentState = state.slice();
        currentState[action.payload.email] = [action.payload.message];
        return currentState;
    }
    else if (action.type == chatActions.addMessage){
        console.log(action.payload);
        const email = action.payload.email;
        const message = action.payload.message;
        const currentState = state.slice();
        currentState[email].messages.push(message);
        return currentState;
    }
    else{
        return state;
    }
};