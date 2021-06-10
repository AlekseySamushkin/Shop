import API from "../api";
import { put, call } from "redux-saga/effects";
import {addNewCart, clearCart, setCart} from "../actions/cart";
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
// ];



export function storeTokens({ token } = {}) {
    localStorage.setItem('token', token || '');
}

export function* getCartSaga(  ) {
    try {
        const token = localStorage.getItem('token') || null;
        const json = token ? yield API.rest.cart.get({ token }) : [];
        yield put( setCart(json));
    } catch (err) {
        console.log(err);
    }
}


export function* addInCartSaga( action ) {
    try {
        const token = localStorage.getItem('token') || 'null';
        const json = yield API.rest.cart.add({
            ...action.$payload,
            token
        });
        storeTokens(json)
        yield put( addNewCart(json));
    } catch (err) {
        console.log(err);
    }
}


export function* sendCartSaga( action ) {
    try {
        console.log('action.$payload',action.$payload)
        yield API.rest.cart.send(action.$payload);
        yield put( clearCart());
    } catch (err) {
        console.log(err);
    }
}


// export function* removeInCartSaga( action ) {
//     try {
//         const token = localStorage.getItem('token') || 'null';
//         const json = yield API.rest.cart.remove(action.$payload.id);
//         storeTokens(json)
//         yield put( addNewCart(json));
//     } catch (err) {
//         console.log(err);
//     }
// }
