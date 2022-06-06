import { createContext, useReducer } from 'react';
import { productListReducer } from '../reducers/productReducers';
import { productDetailsReducer } from '../reducers/productReducers';



export const ProductListContext = createContext();        

export const ProductListContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productListReducer, []);               

    return (
        <ProductListContext.Provider value={{state, dispatch}}>
            { children }          
        </ProductListContext.Provider>
    );
}
 

export const ProductDetailsContext = createContext();        
export const ProductDetailsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productDetailsReducer, []);               

    return (
        <ProductDetailsContext.Provider value={{state, dispatch}}>
            { children }         
        </ProductDetailsContext.Provider>
    );
}
 