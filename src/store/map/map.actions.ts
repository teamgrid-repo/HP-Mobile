import {
  SET_MAP_STATE,
} from "./map.actiontypes";
import { MapState } from "./map.models";

export const setMapState = (payload: Partial<MapState>) => ({
  type: SET_MAP_STATE,
  payload,
});
