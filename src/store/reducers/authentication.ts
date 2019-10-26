import axios, { AxiosResponse } from "axios";
import { get } from "lodash";

import { User } from "models/User";
import { PENDING, FULFILLED, REJECTED } from "store/action-types";
import { TOKEN } from "constants/storage";

export const ACTION_TYPES = {
  REGISTER: "auth/REGISTER",
  LOGIN: "auth/LOGIN",
  REFRESH: "auth/REFRESH",
  FETCH_PROFILE: "auth/FETCH_PROFILE",
  REFRESH_SESSION: "auth/REFRESH_SESSION",
  LOGOUT: "auth/LOGOUT",
  INIT: "auth/INIT"
};

const initialState = {
  sessionInitialized: false,
  isAuthenticated: false,
  user: {} as User
};

export type AuthState = Readonly<typeof initialState>;

/**
 * Authentication Reducer
 */
export default (state: AuthState = initialState, action): AuthState => {
  switch (action.type) {
    case ACTION_TYPES.LOGOUT: {
      return {
        ...initialState,
        sessionInitialized: true
      };
    }

    // Pending Actions
    case PENDING(ACTION_TYPES.INIT): {
      return {
        ...state,
        sessionInitialized: false
      };
    }

    case PENDING(ACTION_TYPES.INIT): {
      return {
        ...state,
        sessionInitialized: false
      };
    }

    case PENDING(ACTION_TYPES.FETCH_PROFILE): {
      return {
        ...state,
        isAuthenticated: false,
        user: initialState.user
      };
    }

    // Fulfilled Actions
    case FULFILLED(ACTION_TYPES.INIT): {
      return {
        ...state,
        sessionInitialized: true
      };
    }

    case FULFILLED(ACTION_TYPES.FETCH_PROFILE): {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data
      };
    }

    // Rejected Actions
    case REJECTED(ACTION_TYPES.INIT): {
      return {
        ...state,
        sessionInitialized: true
      };
    }

    case REJECTED(ACTION_TYPES.FETCH_PROFILE): {
      return {
        ...state,
        isAuthenticated: false,
        user: initialState.user
      };
    }

    default:
      return state;
  }
};

export const register = (username: string, email: string, password: string) => ({
  type: ACTION_TYPES.REGISTER,
  payload: registrationRequest(username, email, password)
});

/**
 * Log out active the user.
 */
export const logout = () => dispatch => {
  clearSessionTokens();
  dispatch({ type: ACTION_TYPES.LOGOUT });
};

/**
 * Fetch the logged in user's profile information.
 */
export const fetchProfile = () => ({
  type: ACTION_TYPES.FETCH_PROFILE,
  payload: axios.get("users/access")
});

/**
 * Perform refresh token Network Request.
 */
export const refreshSession = (refreshToken: string) =>
  axios.post("refresh", { refreshToken }).then(setToken);

/**
 * Send a password reset request to the administrator.
 * @param email email of the specified account owner.
 */
export const requestPasswordReset = (username: string) =>
  axios.post("forgot-password", { username });

/**
 * Initialize a user session on app launch with tokens from
 * session storage.
 */
export const initSession = () => async dispatch => {
  dispatch({ type: PENDING(ACTION_TYPES.INIT) });

  const refreshToken = localStorage.getItem(TOKEN);

  if (!refreshToken) {
    return dispatch({ type: REJECTED(ACTION_TYPES.INIT) });
  }

  try {
    await refreshSession(refreshToken);
    await dispatch(fetchProfile());
  } catch (e) {
    return dispatch({ type: REJECTED(ACTION_TYPES.INIT) });
  }

  return dispatch({ type: FULFILLED(ACTION_TYPES.INIT) });
};

/**
 * Initialize a user session with a username and password
 * @param {string} username - email of specified user.
 * @param {string} password - password of specified user.
 */
export const login = (username, password) => async dispatch => {
  await loginRequest(username, password);
  await dispatch(fetchProfile());
};

const loginRequest = (identifier, password) =>
  axios.post("auth/local", { identifier, password }).then(setToken);

const registrationRequest = (username: string, email: string, password: string) =>
  axios.post("auth/local/register", { username, email, password }).then(setToken);

/**
 * Save token
 */
const setToken = (response: AxiosResponse) => {
  localStorage.setItem(TOKEN, response.data.jwt);
};

/**
 * Clear active users session tokens.
 */
const clearSessionTokens = () => {
  localStorage.clear();
};
