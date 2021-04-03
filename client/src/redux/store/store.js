import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import reducerProduct from '../reducers/reducerProduct';
import reducerCategory from '../reducers/reducerCategory';
import reducerUser from '../reducers/reducerUser';
import reducerOrder from '../reducers/reducerOrder';
import reducerCart from '../reducers/reducerCart';
import reducerReview from '../reducers/reducerReview';
import reducerLogin from '../reducers/reducerLogin';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    reducerUser,
    reducerCategory,
    reducerProduct,
    reducerOrder,
    reducerCart,
    reducerReview,
    reducerLogin
  }),
  composeEnhancer(applyMiddleware(thunk))
);
export default store;