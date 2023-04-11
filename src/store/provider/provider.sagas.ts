import { AxiosResponse } from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  API_ROUTES,
  IFilterSearchRes,
  IProviderList,
  IProviderDetailState,
  ISavedClient,
  ISaveSearch,
  IAppointment,
} from "src/shared";
import axiosInt from "src/utils/callApi";
import axiosIntSingleKey from "src/utils/callApiWithSingleKey";
import { setLoading, handleError } from "../global";
import {
  getAppointmentsRequest,
  getFilterSearchRequest,
  getProviderDetailsRequest,
  getSavedClientsRequest,
  getSavedListingRequest,
  getSavedSearchesRequest,
  setAppointmentsSuccess,
  setFilterSearchState,
  setProviderDetailsSuccess,
  setSavedClientSuccess,
  setSavedListingSuccess,
  setSavedSearchesSuccess,
} from "./provider.actions";
import {
  GET_APPOINTMENTS_REQUEST,
  GET_FILTER_SEARCH_REQUEST,
  GET_PROVIDER_DETAILS_REQUEST,
  GET_SAVED_CLIENT_REQUEST,
  GET_SAVED_LISTING_REQUEST,
  GET_SAVED_SEARCHES_REQUEST,
} from "./provider.actiontypes";

function* getSavedListing(action: ReturnType<typeof getSavedListingRequest>) {
  try {
    yield put(setLoading(action.type, true));
    const response: AxiosResponse<IProviderList[]> = yield call(() =>
      axiosInt.get(`${API_ROUTES.savedListing}`)
    );
    yield put(setSavedListingSuccess(response.data));
  } catch (error) {
    yield put(handleError(action.type, JSON.stringify(error)));
  } finally {
    yield put(setLoading(action.type, false));
  }
}

function* getSavedSearches(action: ReturnType<typeof getSavedSearchesRequest>) {
  try {
    yield put(setLoading(action.type, true));
    const response: AxiosResponse<ISaveSearch[]> = yield call(() =>
      axiosInt.post(API_ROUTES.getSaveSearches, { all: true })
    );
    yield put(setSavedSearchesSuccess(response.data));
  } catch (error) {
    yield put(handleError(action.type, JSON.stringify(error)));
  } finally {
    yield put(setLoading(action.type, false));
  }
}

function* getSavedClient(action: ReturnType<typeof getSavedClientsRequest>) {
  try {
    yield put(setLoading(action.type, true));
    const response: AxiosResponse<ISavedClient[]> = yield call(() =>
      axiosInt.get(API_ROUTES.savedClient)
    );
    yield put(setSavedClientSuccess(response.data));
  } catch (error) {
    yield put(handleError(action.type, JSON.stringify(error)));
  } finally {
    yield put(setLoading(action.type, false));
  }
}

function* getAppointments(action: ReturnType<typeof getAppointmentsRequest>) {
  try {
    yield put(setLoading(action.type, true));
    const response: AxiosResponse<IAppointment[]> = yield call(() =>
      axiosInt.get(API_ROUTES.allAppointment)
    );
    yield put(setAppointmentsSuccess(response.data));
  } catch (error) {
    yield put(handleError(action.type, JSON.stringify(error)));
  } finally {
    yield put(setLoading(action.type, false));
  }
}

function* getFilterSearch(action: ReturnType<typeof getFilterSearchRequest>) {
  const { type, payload } = action;
  try {
    yield put(setLoading(type, true));
    const response: AxiosResponse<IFilterSearchRes> = yield call(() =>
      axiosIntSingleKey.post(`${API_ROUTES.filterProvider}`, payload)
    );
    yield put(setFilterSearchState(response.data));
  } catch (error) {
    yield put(handleError(type, JSON.stringify(error)));
  } finally {
    yield put(setLoading(type, false));
  }
}

function* getProviderDetails(action: ReturnType<typeof getProviderDetailsRequest>) {
  const { type, payload } = action;
  try {
    yield put(setLoading(type, true));
    const response: AxiosResponse<IProviderDetailState> = yield call(() =>
      axiosIntSingleKey.get(`${API_ROUTES.providerDetails}/${payload}`)
    );
    yield put(setProviderDetailsSuccess(response.data));
  } catch (error) {
    yield put(handleError(type, JSON.stringify(error)));
  } finally {
    yield put(setLoading(type, false));
  }
}

export default function* providerSaga() {
  yield all([
    takeEvery(GET_SAVED_LISTING_REQUEST, getSavedListing),
    takeEvery(GET_SAVED_SEARCHES_REQUEST, getSavedSearches),
    takeEvery(GET_SAVED_CLIENT_REQUEST, getSavedClient),
    takeEvery(GET_APPOINTMENTS_REQUEST, getAppointments),
    takeEvery(GET_FILTER_SEARCH_REQUEST, getFilterSearch),
    takeEvery(GET_PROVIDER_DETAILS_REQUEST, getProviderDetails),
  ]);
}
