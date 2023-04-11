import { AxiosResponse } from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { API_ROUTES } from "src/shared";
import axiosIntSingleKey from "src/utils/callApiWithSingleKey";
import { setLoading, handleError } from "../global";
import {
  getCareSubcategoriesRequest,
  getSpecialQualificationsRequest,
  setCareSubcategoriesState,
  setSpecialQualificationsState,
} from "./category.actions";
import {
  GET_CARE_SUBCATEGORIES_REQUEST,
  GET_SPECIAL_QUALIFICATIONS_REQUEST,
} from "./category.actiontypes";

function* getCareSubcategories(action: ReturnType<typeof getCareSubcategoriesRequest>) {
  try {
    yield put(setLoading(action.type, true));
    const response: AxiosResponse<any> = yield call(() =>
      axiosIntSingleKey.get(API_ROUTES.cureSubcategories)
    );
    yield put(setCareSubcategoriesState(response.data));
  } catch (error) {
    yield put(handleError(action.type, JSON.stringify(error)));
  } finally {
    yield put(setLoading(action.type, false));
  }
}

function* getSpecialQualifications(action: ReturnType<typeof getSpecialQualificationsRequest>) {
  try {
    yield put(setLoading(action.type, true));
    const response: AxiosResponse<any> = yield call(() =>
      axiosIntSingleKey.get(API_ROUTES.specialQualification)
    );
    yield put(setSpecialQualificationsState(response.data));
  } catch (error) {
    yield put(handleError(action.type, JSON.stringify(error)));
  } finally {
    yield put(setLoading(action.type, false));
  }
}

export default function* categorySaga() {
  yield all([
    takeEvery(GET_CARE_SUBCATEGORIES_REQUEST, getCareSubcategories),
    takeEvery(GET_SPECIAL_QUALIFICATIONS_REQUEST, getSpecialQualifications),
  ]);
}
