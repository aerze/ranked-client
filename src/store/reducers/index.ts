import { combineReducers } from "redux";

import auth, { AuthState } from "store/reducers/authentication";

export interface RootState {
  readonly auth: AuthState;
}

const rootReducer = combineReducers<RootState>({
  auth
});

export default rootReducer;
