import API from "../api";
import { put, call } from "redux-saga/effects";
import { setCategory } from "../actions/category";

// const json = [
//     {
//         id: 1,
//         name: "iPhones"
//     },
//     {
//         id: 2,
//         name: "Смартфоны"
//     },
//     {
//         id: 3,
//         name: "Samsung"
//     },
//     {
//         id: 4,
//         name: "Huawei"
//     },
// ]

export function* getAllCategoriesSaga() {
    try {
        const json = yield API.rest.category.getAll();
        yield put( setCategory(json));
    } catch ( err ) {
        console.log(err);
    }
}
