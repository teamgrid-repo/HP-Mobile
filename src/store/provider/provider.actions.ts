import { AppointmentFilterType, SavedSortType } from "src/shared";
import {
  IFilterSearchRes,
  IFilterRequestState,
  IFilterState,
  IProviderDetailState,
  IProviderList,
  ISavedClient,
  ISaveSearch,
  IAppointment,
} from "src/shared/models";
import {
  GET_FILTER_SEARCH_REQUEST,
  GET_SAVED_LISTING_REQUEST,
  SET_FILTER_SEARCH_STATE,
  SET_FILTER_REQUEST_STATE,
  SET_SAVED_LISTING_SUCCESS,
  SET_FILTER_STATE,
  GET_PROVIDER_DETAILS_REQUEST,
  SET_PROVIDER_DETAILS_SUCCESS,
  GET_SAVED_CLIENT_REQUEST,
  SET_SAVED_CLIENT_SUCCESS,
  GET_SAVED_SEARCHES_REQUEST,
  SET_SAVED_SEARCHES_SUCCESS,
  SET_SAVED_SEARCHES_SORT_BY_STATE,
  DELETE_SAVED_SEARCH_SUCCESS,
  GET_APPOINTMENTS_REQUEST,
  SET_APPOINTMENTS_SUCCESS,
  SET_APPOINTMENTS_FILTER_BY_STATE,
  SET_SAVED_CLIENT_FILTER_BY_STATE,
  SET_SAVED_LISTING_SORT_BY_STATE,
  SET_SELECTED_SAVED_LISTING_STATE,
} from "./provider.actiontypes";

export const setFilterRequestState = (payload: Partial<IFilterRequestState>) => ({
  type: SET_FILTER_REQUEST_STATE,
  payload,
});
export const getFilterSearchRequest = (payload: IFilterRequestState) => ({
  type: GET_FILTER_SEARCH_REQUEST,
  payload,
});
export const setFilterSearchState = (payload: IFilterSearchRes) => ({
  type: SET_FILTER_SEARCH_STATE,
  payload,
});

export const setFilterState = (payload: Partial<IFilterState>) => ({
  type: SET_FILTER_STATE,
  payload,
});

/**
 * Saved Provider Listing
 */
export const getSavedListingRequest = () => ({
  type: GET_SAVED_LISTING_REQUEST,
});
export const setSavedListingSuccess = (payload: IProviderList[]) => ({
  type: SET_SAVED_LISTING_SUCCESS,
  payload,
});
export const setSavedListingSortByState = (payload: SavedSortType) => ({
  type: SET_SAVED_LISTING_SORT_BY_STATE,
  payload,
});
export const setSelectedSavedListingState = (payload: string) => ({
  type: SET_SELECTED_SAVED_LISTING_STATE,
  payload,
});

/**
 * Saved Clients
 */
export const getSavedClientsRequest = () => ({
  type: GET_SAVED_CLIENT_REQUEST,
});
export const setSavedClientSuccess = (payload: ISavedClient[]) => ({
  type: SET_SAVED_CLIENT_SUCCESS,
  payload,
});
export const setSavedClientsSortByState = (payload: SavedSortType) => ({
  type: SET_SAVED_CLIENT_FILTER_BY_STATE,
  payload,
});

export const getProviderDetailsRequest = (payload: string) => ({
  type: GET_PROVIDER_DETAILS_REQUEST,
  payload,
});
export const setProviderDetailsSuccess = (payload: IProviderDetailState | null) => ({
  type: SET_PROVIDER_DETAILS_SUCCESS,
  payload,
});

/**
 * Saved Searches
 */
export const getSavedSearchesRequest = () => ({
  type: GET_SAVED_SEARCHES_REQUEST,
});
export const setSavedSearchesSuccess = (payload: ISaveSearch[]) => ({
  type: SET_SAVED_SEARCHES_SUCCESS,
  payload,
});
export const setSavedSearchesSortByState = (payload: SavedSortType) => ({
  type: SET_SAVED_SEARCHES_SORT_BY_STATE,
  payload,
});
export const deleteSavedSearchSuccess = (payload: string) => ({
  type: DELETE_SAVED_SEARCH_SUCCESS,
  payload,
});

/**
 * Appointments
 */
export const getAppointmentsRequest = () => ({
  type: GET_APPOINTMENTS_REQUEST,
});
export const setAppointmentsSuccess = (payload: IAppointment[]) => ({
  type: SET_APPOINTMENTS_SUCCESS,
  payload,
});
export const setAppointmentsFilterByState = (payload: AppointmentFilterType) => ({
  type: SET_APPOINTMENTS_FILTER_BY_STATE,
  payload,
});
