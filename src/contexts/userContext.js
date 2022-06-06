import { createContext, useReducer } from 'react';

import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from '../reducers/userReducers';



export const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(userLoginReducer, {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {},
    });

    const [register_state, register_dispatch] = useReducer(userRegisterReducer, {
        userInfo: {},
    });

    return (
        <UserAuthContext.Provider value={{ state, dispatch, register_state, register_dispatch }}>
            {children}
        </UserAuthContext.Provider>
    );
}



export const UserDetailsContext = createContext();

export const UserDetailsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(userDetailsReducer, {
        user: {},
    });

    return (
        <UserDetailsContext.Provider value={{ state, dispatch }}>
            {children}
        </UserDetailsContext.Provider>
    );
}



export const UserUpdateProfileContext = createContext();

export const UserUpdateProfileProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(userUpdateProfileReducer, {});

    return (
        <UserUpdateProfileContext.Provider value={{state, dispatch}}>
            {children}
        </UserUpdateProfileContext.Provider>
    );
}


