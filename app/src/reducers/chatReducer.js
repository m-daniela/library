
/**
 * Chat reducer
 * Holds all the chats for the 
 * contact account
 * 
 * data:
 * 
 * chats = {
 *  email1: [{}, {}, {}], 
 *  email2: [{}], ...
 * }
 * 
 * In case of normal users, the data
 * format is the same, but the only 
 * entry is "contact": [...]
 */

import { actions } from "./bookReducer";

export const chatActions = {
    addMessage: "add_message", 
    clear: "clear", 
    load_data: "load_data"
};

export const initialState = {};

export const initialization = (chats) => {
    return chats;
};

const prepareMessage = (state, email, message) => {
    // prepare the message
    // if the chat isn't registered, add it and add the message
    // otherwise, just append it to the list of existing messages
    if (state[email]){
        state[email].push(message);
    }
    else{
        state[email] = [message];
    }
    return state;
};

export const reducer = (state, action) => {
    if (action.type == actions.load_data){
        return action.payload;
    }
    else if (action.type == chatActions.addMessage){
        const currentState = JSON.parse(JSON.stringify(state));
        const {email, message} = action.payload;
        return prepareMessage(currentState, email, message);
    }
    else if(action.type == chatActions.clear){
        return {};
    }
    else{
        return state;
    }
};