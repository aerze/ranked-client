import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunkMiddleware from "redux-thunk";
import rootReducer, { RootState } from "./reducers/index";

const defaultMiddleware = [thunkMiddleware, promiseMiddleware];

const reduxDevtoolsExtension = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"];
const devtoolsCompose = reduxDevtoolsExtension
  ? reduxDevtoolsExtension({ trace: true, traceLimit: 10 })
  : null;
const devComposeEnhancers: <R>(a: R) => R = devtoolsCompose || compose;

const composedMiddleware =
  process.env.NODE_ENV === "development"
    ? devComposeEnhancers(applyMiddleware(...defaultMiddleware))
    : compose(applyMiddleware(...defaultMiddleware));

const store = createStore(rootReducer, {} as RootState, composedMiddleware);

export default store;
