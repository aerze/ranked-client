import axios, { AxiosResponse } from "axios";
import { get } from "lodash";
import { BASE_API_URL } from "constants/environment";
import { TOKEN } from "constants/storage";
import { refreshSession } from "../store/reducers/authentication";

axios.defaults.baseURL = BASE_API_URL;

// removes agents from axios configs, to prevent circular references
function removeAgents(axios, config) {
  if (axios.defaults.agent === config.agent) {
    delete config.agent;
  }
  if (axios.defaults.httpAgent === config.httpAgent) {
    delete config.httpAgent;
  }
  if (axios.defaults.httpsAgent === config.httpsAgent) {
    delete config.httpsAgent;
  }
}

/**
 * Setup axios for default api url and error handling.
 */
const setupAxios = onUnauthenticated => {
  /**
   * During an active session add a Bearer token to all request headers.
   */
  const requestInterceptor = config => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  /**
   * Check all response for and handle authorization errors.
   */
  const onResponseError = async responseError => {
    const config = responseError.config;
    const status =
      get(responseError, "status", null) ||
      get(responseError, "response.status", null);
    const missingConfig = !config;
    const isLoginRoute =
      responseError.request.responseURL === BASE_API_URL + "login";

    // attempt to refresh session and retry request
    if (status === 403 || status === 401) {
      if (missingConfig || isLoginRoute) throw responseError;

      /** pulled from https://github.com/softonic/axios-retry/blob/master/es/index.js */
      removeAgents(axios, config);
      // config.transformRequest = [data => data]

      // For non login authorization failures attempt to refresh the access token
      // If the access token cannot be refreshed, navigate to login
      const token = localStorage.getItem(TOKEN);
      if (!token) {
        onUnauthenticated();
        throw responseError;
      }

      try {
        await refreshSession(token);
        return axios(config);
      } catch (refreshError) {
        onUnauthenticated();
        throw refreshError;
      }
    }

    throw responseError;
  };

  /**
   * Allow successful responses to pass through;
   */
  const onResponseSuccess = (response: AxiosResponse) => {
    if (response.data.jwt) {
      localStorage.setItem(TOKEN, response.data.jwt);
    }
    return response;
  };

  axios.interceptors.request.use(requestInterceptor);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxios;
