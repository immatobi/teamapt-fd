import {
    GET_LOGGEDIN_USER,
    GET_USER,
    GET_USER_STATUS,
    SET_LOADING,
} from '../types';


const reducer = (state, action) => {

    switch(action.type){

        case GET_LOGGEDIN_USER: 
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case GET_USER: 
            return {
                ...state,
                getuser: action.payload,
                loading: false
            }

        case SET_LOADING: 
            return {
                ...state,
                loading: true
            }
            
        default: 
            return state;
    }

}

export default reducer;