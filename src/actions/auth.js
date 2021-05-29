import { createAction } from './common';
import types from '../types';

export const login = createAction( types.LOGIN );
export const logout = createAction( types.LOGOUT );
export const setAuthData = createAction( types.SET_AUTH_DATA );
export const clearAuthData = createAction( types.CLEAR_AUTH_DATA );
export const reconnect = createAction( types.RECONNECT_AUTH_DATA );
export const check = createAction( types.CHECK_AUTH_DATA );
// export const getUser = createAction( types.GET_USER );
// export const setUser = createAction( types.SET_USER );
export const clearCurrentUser = createAction( types.CLEAR_CURRENT_USER );
export const sendPhoneLogin = createAction( types.SEND_PHONE_LOGIN );
export const sendCodeLogin = createAction( types.SEND_CODE_LOGIN );
export const setContact = createAction( types.SET_CONTACT );
export const updateCurrentUser = createAction( types.UPDATE_CURRENT_USER );
export const updateCurrentUserMessages = createAction( types.UPDATE_CURRENT_USER_MESSAGES );
