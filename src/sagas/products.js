import API from "../api";
import { put, call } from "redux-saga/effects";
import {setProduct, setProducts} from "../actions/productList";
import phone from "../assets/phone.png";

// const json = [
//     {
//         id: 1,
//         name: "iPhone 4s",
//         description: "Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? ",
//         img: phone,
//     },
//     {
//         id: 2,
//         name: "iPhone 4s",
//         description: "Ну это iPhone 4s. Что тут еще сказать? ",
//         img: phone,
//     },
//     {
//         id: 3,
//         name: "iPhone 4s",
//         description: "Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? ",
//         img: phone,
//     },
//     {
//         id: 4,
//         name: "iPhone 4s",
//         description: "Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? Ну это iPhone 4s. Что тут еще сказать? ",
//         img: phone,
//     },
// ]
export function* getProductsOfCategory( action ) {
    try {
        const { id, query } = action.$payload;
        const json = yield API.rest.item.getOneOfCategory(id, query);
        yield put( setProducts(json));
    } catch ( err ) {
        console.log(err);
    }
}

export function* getOneProductSaga(action) {
    try {
        const { id } = action.$payload;
        const json = yield API.rest.item.getOne(id);
        yield put( setProduct(json)); //.find(el=> el.id === parseInt(id))
    } catch ( err ) {
        console.log(err);
    }
}
