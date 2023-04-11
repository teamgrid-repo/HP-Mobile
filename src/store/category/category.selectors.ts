import { createSelector } from "reselect";
import { ICareSubCategory } from "src/shared";
import { RootState } from "src/store/root-reducer";

export const cureSubCategoriesStateSelector = createSelector(
  (state: RootState) => state.category,
  (r) => r.cureSubCategories
);

export const categoriesStateSelector = createSelector(
  (state: RootState) => state.category,
  (r) => r.cureSubCategories.map((c) => c.category)
);

export const subCategoriesStateSelector = createSelector(
  (state: RootState) => state.category,
  (r) => {
    const subCat: ICareSubCategory[] = [];
    r.cureSubCategories.forEach((c) => subCat.push(...c.subCategory));
    return subCat;
  }
);

export const combinedCatAndSubcatStateSelector = createSelector(
  (state: RootState) => state.category,
  (r) => {
    const cats = r.cureSubCategories.map((c) => c.category);
    const subCat: ICareSubCategory[] = [];
    r.cureSubCategories.forEach((c) => subCat.push(...c.subCategory));
    return [...cats, ...subCat];
  }
);

export const specialQualificationsStateSelector = createSelector(
  (state: RootState) => state.category,
  (r) => r.careSubSpecialQualifications
);

export const filteredSpecialQualificationsStateSelector = createSelector(
  (state: RootState) => state,
  (r) => {
    const { category, provider } = r;
    const { careSubSpecialQualifications } = category;
    const { filterRequestState } = provider;
    return careSubSpecialQualifications.filter((csq) =>
      filterRequestState.category.includes(csq._id)
    );
  }
);
