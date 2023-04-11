import { ICareCategory, IProfile } from ".";
import { ILatLang } from "./provider";

export interface ISite {
  _id: string;
  approvalPending: boolean;
  state: string[];
  cat: ICareCategory[];
  category: string[];
  subcategory: (string | ISubCategoryForSite)[];
  claimStatus: boolean;
  HQ: boolean;
  virtual: boolean;
  homeVisit: boolean;
  siteIdentifier: string;
  name: string;
  website: string;
  address: string;
  city: string;
  zipcode: string;
  additional: boolean;
  userId: string;
  organisationId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  location: ILatLang;
  status?: string;
  radius?: number;
}

export interface ISubCategoryForSite {
  _id: string;
  name: string;
  category_id: { _id: string; name: string; weight: number };
}

export interface ISiteWithSubCategory extends ISite {
  siteSubCategoryInfo: ISiteSubCategoryInfo[];
}

export interface ISiteSubCategoryInfo {
  poc: string[];
  price: string[];
  specialQualiFlag: boolean;
  leaf: boolean;
  isHippa: boolean;
  specialQualif: string[];
  _id: string;
  name: string;
  serviceName: string;
  subCategoryId: string;
  serviceWebpage: string;
  serviceDescription: string;
  siteId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  specialQues: string;
  approvalPending: boolean;
}

export interface ISiteWithSubCategoryForProviderDetails extends ISite {
  siteSubCategoryInfo: ISubCategoryInfoForProviderDetails[];
}

export interface ISubCategoryInfoForProviderDetails {
  name: string;
  icon: string;
  description: string;
  weight: number;
  siteTotalPoc: number;
  subCat: ISubCategoryForProviderDetails[];
}

export interface ISubCategoryForProviderDetails {
  subCategoryName: string;
  subCategoryId: string;
  leaf: boolean;
  isHippa: boolean;
  poc: IProfile[];
  price: string[];
  serviceName: string;
  serviceDescription: string;
  serviceWebpage: string;
  specialQualiFlag: boolean;
  specialQues: string;
  specialQualif: string[];
  categoryName: string;
  categoryId: string;
  categoryIcon: string;
}

export interface ISiteUpdateRequest {
  name: string;
  address: string;
  location: ILatLang;
  website: string;
  zipcode: string;
  state: string[];
  category: string[];
  subcategory: string[];
  HQ: boolean;
  city: string;
  virtual: boolean;
  homeVisit: boolean;
  radius: number;
  additional: boolean;
}

export interface ISiteCreateRequest extends ISiteUpdateRequest {
  userId: string;
  organisationId: string;
}

export interface ISiteSubCategoryInfoRequest {
  serviceName: string;
  serviceDescription: string;
  serviceWebpage: string;
  leaf: boolean;
  isHippa: boolean;
  specialQualiFlag: boolean;
  specialQualif: string[];
  price: string[];
  user1: string;
  user2: string;
  specialQues: string;
  subCategoryId: string;
  poc: string[];
  siteId: string;
  approvalPending: boolean;
}
