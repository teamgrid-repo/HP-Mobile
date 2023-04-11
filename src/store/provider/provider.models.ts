import { AppointmentFilterType, IProviderList, SavedSortType } from "src/shared";
import {
  IFilterSearchRes,
  IFilterRequestState,
  IFilterState,
  IProviderDetailState,
  ISavedClient,
  ISaveSearch,
  IAppointment,
} from "src/shared/models";

export interface ProviderState {
  filterRequestState: IFilterRequestState;
  filterState: IFilterState;
  // saved Provider list
  savedListing: IProviderList[];
  savedListingSortBy: SavedSortType;
  selectedSavedListingId: string;
  // Save Searches
  savedSearches: ISaveSearch[];
  savedSearchesSortBy: SavedSortType;
  // Appointments
  appointments: IAppointment[];
  appointmentFilterBy: AppointmentFilterType;
  // Saved Clients
  savedClients: ISavedClient[];
  savedClientsSortBy: SavedSortType;

  filterSearchRes: IFilterSearchRes;
  providerDetail: IProviderDetailState | null;
}
