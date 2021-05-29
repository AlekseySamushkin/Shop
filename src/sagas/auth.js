// import API from "../api";
// import { put, call } from "redux-saga/effects";
// import { setAuthData, setUser } from "../actions/auth";
// import moment from "moment";

export function storeTokens({ accessToken, refreshToken, expirationDate } = {}) {
    localStorage.setItem('accessToken', accessToken || '');
    localStorage.setItem('refreshToken', refreshToken || '');
    localStorage.setItem('expirationDate', expirationDate || '');
}

// export function* sendPhoneSaga( action ) {
//     try {
//         const json = yield API.rest.guests.authOrLogin(action.$payload.data);
//         console.log(json);
//         action.$payload.onFinish(true);
//     } catch ( err ) {
//         console.log(err);
//         action.$payload.onFinish(false);
//     }
// }

// export function* sendCodeSaga( action ) {
//     try {
//         const json = yield API.rest.guests.loginOrRegister(action.$payload.data);
//         storeTokens(json);
//         yield console.log('[SEND CODE SAGA] json', json);
//         yield put( setAuthData({
//             ...json,
//         }));
//         yield call(
//             getCurrentUserSaga
//         );
//         yield action.$payload.onFinish(true);
//     } catch ( err ) {
//         console.log(err);
//         yield action.$payload.onFinish(false);
//     }
// }

// export function* getCurrentUserSaga( action ) {
//     try {
//         const json = yield API.rest.guests.getCurrentUser({ awaitRenewUser: true });
//         yield put( setUser(json));
//         yield console.log('[GET GUEST SAGA] json', json);
//         // action.$payload.onFinish();
//     } catch ( err ) {
//         console.log(err);
//         // action.$payload.onFinish();
//     }
// }
//
// export function* updateCurrentUserSaga( action ) {
//     try {
//         const json = yield API.rest.guests.changeGuest(action.$payload.data);
//         yield put( setCurrentUser(json));
//         yield console.log('[UPDATE GUEST SAGA] json', json);
//         action.$payload.onFinish();
//     } catch ( err ) {
//         console.log(err);
//     }
// }
//
// export function* updateCurrentUserMessagesSaga( action ) {
//     try {
//         const json = yield API.rest.guests.changeMessageDistribution(action.$payload.data);
//         yield put( setCurrentUser(json));
//     } catch ( err ) {
//         console.log(err);
//     }
// }

// export function* checkTokensSaga( action ) {
//     try {
//         const data = {
//             accessToken: localStorage.getItem('accessToken') || '',
//             refreshToken: localStorage.getItem('refreshToken') || '',
//             expirationDate: localStorage.getItem('expirationDate') || '',
//         };
//         const isActualTokens = moment().isBefore(moment(data.expirationDate));
//         if (isActualTokens) {
//             yield put( setAuthData({
//                 ...data,
//             }));
//         } else {
//             yield put( setAuthData({
//                 isNotAuth: true,
//             }));
//         }
//         yield action.$payload.onFinish(isActualTokens);
//     } catch ( err ) {
//         console.log(err);
//         action.$payload.onFinish();
//     }
// }
