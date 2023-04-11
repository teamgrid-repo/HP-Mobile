import { RootAction } from "../root-action";
import {
  SET_CARE_SUBCATEGORIES_STATE,
  SET_SPECIAL_QUALIFICATIONS_STATE,
} from "./category.actiontypes";
import { CategoryState } from "./category.models";

const initialState: CategoryState = {
  cureCategories: [],
  cureSubCategories: [],
  careSubSpecialQualifications: [],
};

export const categoryReducer = (
  state: CategoryState = initialState,
  action: RootAction
): CategoryState => {
  const { type, payload } = action;

  switch (type) {
    case SET_CARE_SUBCATEGORIES_STATE:
      return { ...state, cureSubCategories: payload };
    case SET_SPECIAL_QUALIFICATIONS_STATE:
      return { ...state, careSubSpecialQualifications: payload };
    default:
      return state;
  }
};
