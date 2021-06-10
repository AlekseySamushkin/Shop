import types from "../types";

const initialState = {
    basket: null
};

const reducer = ( state = initialState, action ) => {

    switch( action.type ) {
        case types.SET_CART:
            return {
                ...state,
                basket: action.$payload,
            };
        case types.SET_NEW_ITEM_CART:
            return {
                ...state,
                basket: [...state.basket, action.$payload],
            };
        case types.CLEAR_CART:
            return {
                ...state,
                basket: null,
            };
        case types.DELETE_CART:
            const filteredList = state.basket.filter(el=> el.id !== action.$payload)
            return {
                ...state,
                basket: filteredList.length === 0 ? null : filteredList,
            };
        default:
            return state;
    }
};

export default reducer;
