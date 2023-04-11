import { orderBy, sortBy } from "lodash";
import { createSelector } from "reselect";
import { RootState } from "src/store/root-reducer";

export const mapStateSelector = createSelector(
  (state: RootState) => state.map,
  (r) => r
);
