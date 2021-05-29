import { createAction } from './common';
import types from '../types';

export const getAllCategory = createAction( types.GET_ALL_CATEGORY );
export const setActualCategory = createAction( types.SET_ACTUAL_CATEGORY );
export const setCategory = createAction( types.SET_CATEGORY );
