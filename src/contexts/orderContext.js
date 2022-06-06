import { createContext, useReducer } from 'react';

import { orderCreateReducer, orderDetailsReducer, listMyOrdersReducer } from '../reducers/orderReducers';


export const OrderCreateContext = createContext();

export const OrderCreateContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(orderCreateReducer, {});

    return (
        <OrderCreateContext.Provider value={{ state, dispatch }}>
            {children}
        </OrderCreateContext.Provider>
    );
}


export const OrderDetailsContext = createContext();

export const OrderDetailsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(orderDetailsReducer, {});

    return (
        <OrderDetailsContext.Provider value={{ state, dispatch }}>
            {children}
        </OrderDetailsContext.Provider>
    );
}


export const ListMyOrdersContext = createContext();

export const ListMyOrdersContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(listMyOrdersReducer, {
        orders: []
    });

    return (
        <ListMyOrdersContext.Provider value={{ state, dispatch }}>
            {children}
        </ListMyOrdersContext.Provider>
    );
}

