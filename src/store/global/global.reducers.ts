import { RootAction } from "../root-action";
import { SET_LOADING, RESET_LOADING, SET_ERROR, CLEAR_ERRORS } from "./global.actiontypes";
import { GlobalState } from "./global.models";

const initialState: GlobalState = {
  loading: {},
  errors: {},
};

export const globalReducer = (
  state: GlobalState = initialState,
  action: RootAction
): GlobalState => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [payload.key]: payload.loading,
        },
      };
    case RESET_LOADING:
      return { ...state, loading: {} };
    case SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [payload.key]: payload.error },
      };
    case CLEAR_ERRORS:
      return { ...state, errors: {} };
    default:
      return state;
  }
};
