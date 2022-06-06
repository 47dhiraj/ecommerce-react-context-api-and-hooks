import { createContext, useReducer } from 'react';

import { cartReducer } from '../reducers/cartReducers';


export const CarttContext = createContext();

export const CarttContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, {

        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],

        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},

        paymentMethod: localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : ""

    });

    return (
        <CarttContext.Provider value={{ state, dispatch }}>
            {children}
        </CarttContext.Provider>
    );
}

