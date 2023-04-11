import { createSelector } from "reselect";
import { RootState } from "src/store/root-reducer";

export const loadingSelector = (actionType: string) =>
  createSelector(
    (state: RootState) => state.global.loading,
    (r) => r[actionType]
  );

export const multiLoadingSelector = (actionTypes: string[]) =>
  createSelector(
    (state: RootState) => state.global.loading,
    (r) => !!actionTypes.filter((actionType) => r[actionType]).length
  );

export const errorSelector = (actionType: string) =>
  createSelector(
    (state: RootState) => state.global.errors,
    (r) => r[actionType]
  );
