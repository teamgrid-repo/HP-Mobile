import { ICareCategory, ICareSubCategory } from "..";

export const getCategoryName = (
  combinedCatAndSubcats: (ICareCategory | ICareSubCategory)[],
  id: string
) => {
  const subCat = combinedCatAndSubcats.find((cat) => cat._id === id);
  return subCat ? subCat.name.toLowerCase() : "";
};
