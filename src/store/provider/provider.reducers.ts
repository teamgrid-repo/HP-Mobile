import { RootAction } from "../root-action";
import {
  SET_FILTER_SEARCH_STATE,
  SET_FILTER_REQUEST_STATE,
  SET_SAVED_LISTING_SUCCESS,
  SET_FILTER_STATE,
  SET_PROVIDER_DETAILS_SUCCESS,
  SET_SAVED_CLIENT_SUCCESS,
  SET_SAVED_SEARCHES_SUCCESS,
  SET_SAVED_SEARCHES_SORT_BY_STATE,
  DELETE_SAVED_SEARCH_SUCCESS,
  SET_APPOINTMENTS_SUCCESS,
  SET_APPOINTMENTS_FILTER_BY_STATE,
  SET_SAVED_CLIENT_FILTER_BY_STATE,
  SET_SAVED_LISTING_SORT_BY_STATE,
  SET_SELECTED_SAVED_LISTING_STATE,
} from "./provider.actiontypes";
import { ProviderState } from "./provider.models";

export const initialFilterRequest: any = {
  filter: "",
  address: "",
  states: [],
  category: [],
  prices: [],
  specialQualifications: [],
  leaf: false,
  keywords: "",
  locFilter: false,
  customLocData: {
    currLoc: false,
    address: "",
    location: null,
  },
  des: 1,
  index: 0,
};

const initialState: ProviderState = {
  filterRequestState: { ...initialFilterRequest, additionalResource: false },
  filterState: {
    filterTypes: ["homeVisit", "ino", "virtual"],
  },
  savedListing: [],
  savedListingSortBy: "Default",
  selectedSavedListingId: "",
  savedSearches: [],
  savedSearchesSortBy: "Default",
  savedClients: [],
  savedClientsSortBy: "Default",
  appointments: [],
  filterSearchRes: {
    count: { total: 0, virtualSite: 0, homeVisit: 0, inOffice: 0 },
    provider: [],
  },
  providerDetail: null,
  appointmentFilterBy: "default",
};

export const providerReducer = (
  state: ProviderState = initialState,
  action: RootAction
): ProviderState => {
  const { type, payload } = action;

  switch (type) {
    case SET_FILTER_REQUEST_STATE:
      return { ...state, filterRequestState: { ...state.filterRequestState, ...payload } };
    case SET_SAVED_LISTING_SUCCESS:
      return { ...state, savedListing: payload };
    case SET_SAVED_LISTING_SORT_BY_STATE:
      return { ...state, savedListingSortBy: payload };
    case SET_SELECTED_SAVED_LISTING_STATE:
      return { ...state, selectedSavedListingId: payload };
    case SET_SAVED_SEARCHES_SUCCESS:
      return { ...state, savedSearches: payload };
    case SET_SAVED_SEARCHES_SORT_BY_STATE:
      return { ...state, savedSearchesSortBy: payload };
    case DELETE_SAVED_SEARCH_SUCCESS:
      return {
        ...state,
        savedSearches: state.savedSearches.filter((savedSearch) => savedSearch._id !== payload),
      };
    case SET_SAVED_CLIENT_SUCCESS:
      return { ...state, savedClients: payload };
    case SET_SAVED_CLIENT_FILTER_BY_STATE:
      return { ...state, savedClientsSortBy: payload };
    case SET_FILTER_SEARCH_STATE:
      return { ...state, filterSearchRes: payload };
    case SET_FILTER_STATE:
      return { ...state, filterState: payload };
    case SET_PROVIDER_DETAILS_SUCCESS:
      return { ...state, providerDetail: payload };
    case SET_APPOINTMENTS_SUCCESS:
      return { ...state, appointments: payload };
    case SET_APPOINTMENTS_FILTER_BY_STATE:
      return { ...state, appointmentFilterBy: payload };
    default:
      return state;
  }
};
