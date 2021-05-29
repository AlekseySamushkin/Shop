import types from '../types';


export const createAction = type => payload =>  {
    return {
        type: type,
        $payload: payload || {},
    };
};

export const redirect = ( pathname, method = 'push', search = null ) => {
    return {
        type: types.REDIRECT_TO,
        $payload: {
            pathname,
            method,
            search,
        },
    };
};

export const saveQuestions = createAction( types.SAVE_QUESTIONS_FIRST_STEP );
export const setQuestions = createAction( types.SET_QUESTIONS_FIRST_STEP );
