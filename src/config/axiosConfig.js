import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupInterceptors = (store) => {
  api.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = store.getState().auth.refreshToken;
          const response = await axios.post(`${BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          store.dispatch({
            type: 'auth/setTokens',
            payload: {
              token: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            }
          });

          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          store.dispatch({ type: 'auth/logout' });
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default api;
