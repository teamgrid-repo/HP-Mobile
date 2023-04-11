import {
  CLEAR_ERRORS,
  HANDLE_ERROR,
  SET_ERROR,
  SET_LOADING,
  RESET_LOADING,
  RESET_STORE,
} from "./global.actiontypes";

export const setLoading = (key: string, loading: boolean) => ({
  type: SET_LOADING,
  payload: { key, loading },
});

export const resetStore = () => ({
  type: RESET_STORE
});

export const resetLoading = () => ({
  type: RESET_LOADING,
});

export const handleError = (key: string, error: string) => ({
  type: HANDLE_ERROR,
  payload: { key, error },
});

export const setError = (key: string, error: string) => ({
  type: SET_ERROR,
  payload: { key, error },
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
