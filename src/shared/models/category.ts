import { ISiteSubCategoryInfo } from "./site";

export interface ICareCategory {
  _id: string;
  active: boolean;
  name: string;
  description: string;
  icon: string;
  weight: number;
  subCategory: ISiteSubCategoryInfo[];
}

export interface ICareSubCategory {
  _id: string;
  active: boolean;
  applicable: boolean;
  name: string;
  __v: number;
  category_id: string;
  createdAt: Date;
  originalName: string;
  updatedAt: Date;
}

export interface ICareCombineCategory {
  category: ICareCategory;
  subCategory: ICareSubCategory[];
}

export interface ICareSubSpecialQualification {
  name: string; // sub category name
  _id: string; // sub category id
  specialQualification: ISpecialQualification[];
  other: any[];
}

export interface ISpecialQualification {
  _id: string;
  name: string;
  subCategoryId: string;
}
