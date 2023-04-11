import { filter, orderBy, uniqBy } from "lodash";
import { createSelector } from "reselect";
import { RootState } from "src/store/root-reducer";

export const filterRequestStateSelector = createSelector(
  (state: RootState) => state.provider,
  (r) => r.filterRequestState
);

/**
 * Provider lists
 */
export const savedListingStateSelector = createSelector(
  (state: RootState) => state.provider,
  (r) => r.savedListing
);
export const savedListingSortBySelector = createSelector(
  (state: RootState) => state.provider,
  (r) => r.savedListingSortBy
);
export const selectedSavedListingIdSelector = createSelector(
  (state: RootState) => state.provider,
  (r) => r.selectedSavedListingId
);
export const selectedSavedListingSelector = createSelector(
  (state: RootState) => state.provider,
  (r) => r.savedListing.find((item) => item._id === r.selectedSavedListingId) || null
);

/**
 * Saved Searches
 */
export const savedSearchesStateSelector = createSelector(
  (state: RootState) => state.provider,
  (r) => r.savedSearches
);
export const savedSearchesBySortSelector = createSelector(
  (state: RootState) => state.provider,
  (r) => {
    if (r.savedSearchesSortBy === "Default") return r.savedSearches;
    else if (r.savedSearchesSortBy === "Ascending")
      return orderBy(r.savedSearches, ["name"], ["asc"]);
    else if (r.savedSearchesSortBy === "Descending")
      return orderBy(r.savedSearches, ["name"], ["desc"]);
    else return r.savedSearches;
  }
);
export const savedSearchesSortBySelector = createSelector(
  (state: RootState) => state.provider,
  (r) => r.savedSearchesSortBy
);

/**
 * Saved Clients
 */
export const savedClientsStateSelector = createSelector(
  (state: RootState) => state.provider,
  (r) => r.savedClients
);
export const savedClientsSortBySelector = createSelector(
  (state: RootState) => state.provider,
  (r) => r.savedClientsSortBy
);
export const savedClientsBySortSelector = createSelector(
  (state: RootState) => state.provider,
  (r) => {
    if (r.savedClientsSortBy === "Default") return r.savedClients;
    else if (r.savedClientsSortBy === "Ascending")
      return orderBy(r.savedClients, ["name"], ["asc"]);
    else if (r.savedClientsSortBy === "Descending")
      return orderBy(r.savedClients, ["name"], ["desc"]);
    else return r.savedClients;
  }
);

export const filterSearchResStateSelector = createSelector(
  (state: RootState) => state.provider,
  (r) => r.filterSearchRes
);

export const filterStateSelector = createSelector(
  (state: RootState) => state.provider,
  (r) => r.filterState
);

export const providerDetailStateSelector = createSelector(
  (state: RootState) => state.provider,
  (r) => r.providerDetail
);

export const countFilterSearchResStateSelector = createSelector(
  (state: RootState) => state.provider,
  (r) => {
    const { provider } = r.filterSearchRes!;
    return {
      total: r.filterSearchRes.count.total,
      searchCount: r.filterSearchRes.provider.length,
      homeVisit: provider.filter((item) => item.homeVisit).length,
      virtual: provider.filter((item) => item.virtual).length,
      inOffice: provider.filter((item) => !item.homeVisit && !item.virtual).length,
    };
  }
);

export const filteredProvidersStateSelector = createSelector(
  (state: RootState) => state.provider,
  (r) => {
    const { provider } = r.filterSearchRes!;
    const { filterTypes } = r.filterState;
    return provider.filter((item) => {
      if (filterTypes.includes("homeVisit") && item.homeVisit) return item;
      if (filterTypes.includes("virtual") && item.virtual) return item;
      if (filterTypes.includes("ino") && !item.virtual && !item.homeVisit) return item;
    });
  }
);

export const appointmentsStateSelector = createSelector(
  (state: RootState) => state.provider,
  (r) =>
    r.appointmentFilterBy === "default"
      ? r.appointments
      : r.appointments.filter((item) => item.status === r.appointmentFilterBy)
);

export const notInClientsStateSelector = createSelector(
  (state: RootState) => state.provider,
  (r) =>
    uniqBy(
      filter(r.appointments, (item) => !!(item.profileData && item.clientData))
        .map((item) => item.clientData)
        .filter((item) => !r.savedClients.find((client) => client.userId._id === item._id)),
      (item) => item._id
    )
);

export const appointmentFilterByStateSelector = createSelector(
  (state: RootState) => state.provider,
  (r) => r.appointmentFilterBy
);
