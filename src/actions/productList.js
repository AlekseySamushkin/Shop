import { createAction } from './common';
import types from '../types';

export const getAllProductsOfCategory = createAction( types.GET_ITEMS_CATEGORY_ID );
export const getProduct = createAction( types.GET_ITEM_ID );
export const setProducts = createAction( types.SET_ITEMS );
export const setProduct = createAction( types.SET_ITEM );
export const setPage = createAction( types.SET_PAGE );
export const clearProducts = createAction( types.CLEAR_ITEMS );
