import { ICareCombineCategory, ICareSubSpecialQualification } from "src/shared/models/category";
import {
  GET_CARE_SUBCATEGORIES_REQUEST,
  GET_SPECIAL_QUALIFICATIONS_REQUEST,
  SET_CARE_SUBCATEGORIES_STATE,
  SET_SPECIAL_QUALIFICATIONS_STATE,
} from "./category.actiontypes";

export const getCareSubcategoriesRequest = () => ({
  type: GET_CARE_SUBCATEGORIES_REQUEST,
});
export const setCareSubcategoriesState = (payload: ICareCombineCategory[]) => ({
  type: SET_CARE_SUBCATEGORIES_STATE,
  payload,
});

export const getSpecialQualificationsRequest = () => ({
  type: GET_SPECIAL_QUALIFICATIONS_REQUEST,
});
export const setSpecialQualificationsState = (payload: ICareSubSpecialQualification[]) => ({
  type: SET_SPECIAL_QUALIFICATIONS_STATE,
  payload,
});
