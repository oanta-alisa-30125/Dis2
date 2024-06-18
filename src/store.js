import { addProductReducer, addProductReviewReducer, deleteProductReducer, favoritesReducer, getAllProductsReducer, getProductByIdReducer, updateProductReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";


import {combineReducers} from 'redux'
import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { deleteUserReducer, getAllUsersReducer, loginReducer, registerNewUserReducer, updateUserAsAdminReducer, updateUserReducer } from "./reducers/userReducer";
import { getAllOrdersReducer, getOrderByIdReducer, getOrdersByUserIdReducer, placeOrderReducer } from "./reducers/orderReducer";

const finalReducer=combineReducers({
    getAllProductsReducer:getAllProductsReducer,
    getProductByIdReducer:getProductByIdReducer,
    cartReducer:cartReducer,
    registerNewUserReducer:registerNewUserReducer,
    loginReducer:loginReducer,
    placeOrderReducer:placeOrderReducer,
    getOrdersByUserIdReducer:getOrdersByUserIdReducer,
    getOrderByIdReducer:getOrderByIdReducer,
    addProductReviewReducer:addProductReviewReducer,
    updateUserReducer:updateUserReducer,
    getAllUsersReducer:getAllUsersReducer,
    deleteUserReducer:deleteUserReducer,
    deleteProductReducer:deleteProductReducer,
    addProductReducer:addProductReducer,
    updateProductReducer:updateProductReducer,
    getAllOrdersReducer:getAllOrdersReducer,
    favoritesReducer:favoritesReducer,
    updateUserAsAdminReducer:updateUserAsAdminReducer
})


const cartItems=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const currentUser=localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')):null
const initialState={
    cartReducer:{cartItems:cartItems},
    loginReducer:{currentUser:currentUser}
}
const composeEnhancers = composeWithDevTools({
});
const store=createStore(finalReducer, initialState, composeEnhancers(
    applyMiddleware(thunk)

))

export default store