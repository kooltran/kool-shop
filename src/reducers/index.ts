import { combineReducers } from "redux";
import initHome from './homeReducer';
import prodList from './prodListReducer';
import prodDetail from './prodDetailReducer';
import cart from './cartReducer';
import cartUpdate from './cartUpdateReducer';

export default combineReducers({
    initHome,
    prodList,
    prodDetail,
    cart,
})