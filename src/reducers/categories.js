import types from "../types";

const initialState = {
    categories: null,
    total: null,
    actualCategory: null,
};

const reducer = ( state = initialState, action ) => {

    switch( action.type ) {
        case types.SET_CATEGORY:
            return {
                ...state,
                categories: action.$payload.categories,
                total: action.$payload.total,
            };
        case types.SET_ACTUAL_CATEGORY:
            return {
                ...state,
                actualCategory: action.$payload,
            };
        case types.CLEAR_CATEGORY:
            return {
                ...state,
                categories: null,
                total: null,
            };
        default:
            return state;
    }
};

export default reducer;
