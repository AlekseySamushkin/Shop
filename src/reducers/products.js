import types from "../types";

const initialState = {
    products: null,
    total: null,
    page: 1,
    product: null
};

const reducer = ( state = initialState, action ) => {

    switch( action.type ) {
        case types.SET_ITEMS:
            return {
                ...state,
                products: action.$payload.items,
                total: action.$payload.total,
            };
        case types.SET_ITEM:
            return {
                ...state,
                product: action.$payload,
            };
        case types.SET_PAGE:
            return {
                ...state,
                page: action.$payload,
            };
        case types.CLEAR_ITEMS:
            return {
                ...state,
                products: null,
                total: null,
            };
        default:
            return state;
    }
};

export default reducer;
