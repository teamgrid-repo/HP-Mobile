import {
  ICareCategory,
  ICareCombineCategory,
  ICareSubSpecialQualification,
} from "src/shared/models/category";

export interface CategoryState {
  cureCategories: ICareCategory[];
  cureSubCategories: ICareCombineCategory[];
  careSubSpecialQualifications: ICareSubSpecialQualification[];
}
