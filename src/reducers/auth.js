import types from "../types";

const initialState = {
    user: {}
};

const reducer = ( state = initialState, action ) => {

    switch( action.type ) {
        case types.SET_AUTH_DATA:
            return {
                ...action.$payload
            };
        case types.CLEAR_AUTH_DATA:
            return { isNotAuth: true };
        default:
            return state;
    }
};

export default reducer;
