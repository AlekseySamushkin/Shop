import {connectRouter} from "connected-react-router";
import {combineReducers} from "redux";
import authReducer from './auth';
import categoriesReducer from './categories';
import productsReducer from './products';
import cartReducer from './cart';

export default (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    categories: categoriesReducer,
    products: productsReducer,
    basket: cartReducer,
});
