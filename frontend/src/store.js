import { Cookies } from 'react-cookie';
import {legacy_createStore} from 'redux';



const cookies = new Cookies();


let initialState = {
    Token:cookies.get("token")
}



function reducer (state=initialState, action){
    switch (action.type) {
        case 'destroy':
            cookies.remove('token');
            return {...state,Token:''}
        case 'set':
            cookies.set('token', action.Token);
            return {...state, Token:action.Token};
        default :
            return state;
    }
}

let store = legacy_createStore(reducer)
export default store;
