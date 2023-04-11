import { RootAction } from "../root-action";
import { SET_MAP_STATE } from "./map.actiontypes";
import { MapState } from "./map.models";

const initialState: MapState = {
  isLoaded: false,
  loadError: undefined
};

export const mapReducer = (state: MapState = initialState, action: RootAction): MapState => {
  const { type, payload } = action;

  switch (type) {
    case SET_MAP_STATE:
      return { ...state, ...payload };
    default:
      return state;
  }
};
