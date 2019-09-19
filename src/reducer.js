import {dataUser} from "./actions";

const  initState ={
    user:null
};

export const userReducer =(state = initState, action) => {
    if (action.type === dataUser.LOAD_USER_DATA_SUCCESS) {
        return {
            ...state,
            user:action.data
        };
    } else {
        return state;
    }
};