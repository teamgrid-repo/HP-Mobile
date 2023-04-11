import axiosInt from "src/utils/callApi";
import { API_ROUTES } from "../constants";
import {
  IEditSaveShareProviderRequest,
  IProviderListRequest,
  ISaveShareProviderRequest,
  ISaveToListRequest,
} from "../models";

export class ProviderService {
  constructor() {}

  static upsertProviderList(data: IProviderListRequest) {
    return axiosInt.post(`${API_ROUTES.savedListing}/create&update`, data);
  }

  static deleteProviderList(id: string) {
    return axiosInt.delete(`${API_ROUTES.deleteSavedListing}/${id}`);
  }

  static saveItemToList(data: ISaveToListRequest) {
    return axiosInt.post(`${API_ROUTES.savedListingItems}/create`, data);
  }

  static deleteItemFromList(id: string) {
    return axiosInt.delete(`${API_ROUTES.savedListingItemsDelete}/${id}`);
  }

  static saveShareProvider(data: ISaveShareProviderRequest) {
    return axiosInt.post(`${API_ROUTES.saveSearches}`, data);
  }

  static editSaveShareProvider(data: IEditSaveShareProviderRequest) {
    return axiosInt.post(`${API_ROUTES.getSaveSearches}`, data);
  }

  static deleteSavedSearch(id: string) {
    return axiosInt.delete(`${API_ROUTES.deleteSaveSearches}/${id}`);
  }
}
