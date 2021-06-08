import { createAction } from './common';
import types from '../types';

export const getCart = createAction( types.GET_CART );
export const addCart = createAction( types.ADD_CART );
export const addNewCart = createAction( types.SET_NEW_ITEM_CART );
export const setCart = createAction( types.SET_CART );
export const sendCart = createAction( types.SEND_CART );
export const deleteCart = createAction( types.DELETE_CART );
export const clearCart = createAction( types.CLEAR_CART );
