
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


export const chatActions = {
    addMessage: "add_message", 
    clear: "clear", 
    loadData: "load_data", 
    loadMessages: "load_messages"
};

export const initialState = {
    chats: [], 
    messages: {},
};

const prepareMessage = (state, email, message) => {
    // prepare the message
    // if the chat isn't registered, add it and add the message
    // otherwise, just append it to the list of existing messages
    if (state.messages[email]){
        state.messages[email].push(message);
    }
    else{
        state.messages[email] = [message];
        state.chats.push({room_name: email});
    }
    console.log(state);
    return state;
};

export const reducer = (state, action) => {
    if (action.type == chatActions.loadData){
        const chats = action.payload;
        return {...state, chats};
    }
    if (action.type == chatActions.loadMessages){
        let {messages} = state;
        messages = {...messages, ...action.payload};
        return {...state, messages};
    }
    else if (action.type == chatActions.addMessage){
        const currentState = JSON.parse(JSON.stringify(state));
        const {email, message} = action.payload;
        return prepareMessage(currentState, email, message);
    }
    else if(action.type == chatActions.clear){
        return initialState;
    }
    else{
        return state;
    }
};