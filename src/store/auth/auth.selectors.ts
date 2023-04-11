import { createSelector } from "reselect";
import { RootState } from "src/store/root-reducer";

export const routeShareStateSelector = createSelector(
  (state: RootState) => state.auth,
  (r) => r.routeShareState
);

export const signupProviderRequestStateSelector = createSelector(
  (state: RootState) => state.auth,
  (r) => r.signupProviderRequest
);

export const signupUserRequestStateSelector = createSelector(
  (state: RootState) => state.auth,
  (r) => r.signupUserRequest
);

export const userStateSelector = createSelector(
  (state: RootState) => state.auth,
  (r) => r.user
);

export const organizationStateSelector = createSelector(
  (state: RootState) => state.auth,
  (r) => r.organization
);

export const cureCategoriesInOrgStateSelector = createSelector(
  (state: RootState) => state,
  (r) => {
    return r.category.cureSubCategories
      .filter((careCat) => r.auth.organization?.category.includes(careCat.category._id))
      .map((careCat) => {
        return {
          category: careCat.category,
          subCategory: careCat.subCategory.filter((subCat) =>
            r.auth.organization?.subcategory.includes(subCat._id)
          ),
        };
      });
  }
);

export const sitesStateSelector = createSelector(
  (state: RootState) => state.auth,
  (r) => r.sites
);

export const fcmTokenStateSelector = createSelector(
  (state: RootState) => state.auth,
  (r) => r.fcmToken
);

export const isLoggedInSelector = createSelector(
  (state: RootState) => state.auth,
  (r) => !!r.user
);

export const additionalMembersSelector = createSelector(
  (state: RootState) => state.auth,
  (r) => r.additionalMembers.filter((item) => item.userId !== r.user?._id)
);

export const additionalMembersWithAuthSelector = createSelector(
  (state: RootState) => state.auth,
  (r) => r.additionalMembers.filter((item) => item.userId)
);
