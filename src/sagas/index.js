import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import types from "../types";
import {getAllCategoriesSaga} from "./category";
import {getProductsOfCategory, getOneProductSaga} from "./products";
import {addInCartSaga, getCartSaga, sendCartSaga} from "./cart";


function* rootSaga() {
    yield all([
        takeLatest( types.GET_ALL_CATEGORY, getAllCategoriesSaga),
        takeLatest( types.GET_ITEMS_CATEGORY_ID, getProductsOfCategory),
        takeLatest( types.GET_ITEM_ID, getOneProductSaga),
        takeLatest( types.GET_CART, getCartSaga),
        takeLatest( types.ADD_CART, addInCartSaga),
        takeLatest( types.SEND_CART, sendCartSaga),
    ]);
}

export default rootSaga;
