import { combineReducers } from 'redux';
import cartReducer from '../features/cartSlice';
import orderReducer from '../features/orderSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  order: orderReducer,
});

export default rootReducer;

