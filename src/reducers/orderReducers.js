export const orderCreateReducer = (state = {}, action) => {

    switch (action.type) {

        case 'ORDER_CREATE_REQUEST':
            return {
                loading: true
            }

        case 'ORDER_CREATE_SUCCESS':
            return {
                loading: false,
                order: action.payload,
                success: true
            }

        case 'ORDER_CREATE_FAIL':
            return {
                loading: false,
                success: false,
                error: action.payload
            }

        case 'ORDER_CREATE_RESET':
            return {}                          

        default:
            return state

    }

}




export const orderDetailsReducer = (state = { loading: true }, action) => {

    switch (action.type) {

        case 'ORDER_DETAILS_REQUEST':
            return {
                ...state,
                loading: true
            }

        case 'ORDER_DETAILS_SUCCESS':
            return {
                loading: false,
                success: true,
                order: action.payload
            }

        case 'ORDER_DETAILS_FAIL':
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}




export const listMyOrdersReducer = (state = {}, action) => {

    switch (action.type) {
        
        case 'LIST_MY_ORDERS_REQUEST':
            return {
                loading: true
            }

        case 'LIST_MY_ORDERS_SUCCESS':
            return {
                loading: false,
                success: true,
                orders: action.payload,
            }

        case 'LIST_MY_ORDERS_FAIL':
            return {
                loading: false,
                error: action.payload,
                success: false
            }

        case 'LIST_MY_ORDERS_RESET':
            return {
                orders: []
            }

        default:
            return state
    }
}
