import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer, productDetailsReducer } from './reducers/product.reducers';
import { cartReducer } from './reducers/cart.reducers';
import { userLoginReducer } from './reducers/user.reducers';
import { userRegisterReducer } from './reducers/user.reducers';
import { userDetailsReducer } from './reducers/user.reducers';
import { userUpdateProfileReducer } from './reducers/user.reducers';
import { orderCreateReducer } from './reducers/order.reducers';
import { orderDetailsReducer } from './reducers/order.reducers';


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
});


const cartItemsFromStorage = localStorage.getItem('cartItems') 
  ? JSON.parse(localStorage.getItem('cartItems')) 
  : []
const userInfoFromStorage = localStorage.getItem('userInfo') 
  ? JSON.parse(localStorage.getItem('userInfo')) 
  : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
  ? JSON.parse(localStorage.getItem('shippingAddress')) 
  : {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') 
  ? JSON.parse(localStorage.getItem('paymentMethod')) 
  : {}


const initialState = {
  cart: { 
    cartItems: cartItemsFromStorage, 
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;