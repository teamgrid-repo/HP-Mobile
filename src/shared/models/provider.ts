import {
  FilterType,
  ICareCategory,
  IProfile,
  IProfileNotification,
  ISite,
  ISiteWithSubCategoryForProviderDetails,
  ISubCategoryForProviderDetails,
  PriceType,
} from "..";

export interface IProviderList {
  _id: string;
  name: string;
  stateLoc?: string;
  userId?: string;
  __v?: number;
  directoryItems?: IDirecotryItem[];
}

export interface IDirecotryItem {
  _id: string;
  createdAt: string;
  updatedAt: string;
  organisation: IOrganization;
  organisationId: string;
  primaryAccountOwnerInfo: IProfile[];
  saveListingId: string;
  siteDetails: ISite;
  siteId: string;
  siteSubCategoryInfo: ISubCategoryForProviderDetails[];
}

export interface ISaveSearch {
  _id: string;
  name: string;
  count: number;
  url: string;
}

export interface ISavedClient extends IProfileNotification {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  name: string;
  acceptTerms: boolean;
  acceptTermsDate: string;
  userState: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IFilterRequestState {
  additionalResource: boolean;
  address: string;
  category: string[];
  customLocData: ICustomLocation;
  des: number;
  keywords: string;
  leaf: boolean;
  locFilter: boolean;
  prices: PriceType[];
  specialQualifications: string[];
  states: string[];
  index: number;
  filter: FilterType | "";
}

export interface IFilterState {
  filterTypes: FilterType[];
}

interface ICustomLocation {
  address: string;
  location: ILatLang | null;
  currLoc: boolean;
}

export interface ILatLang {
  lat: number;
  lang: number;
}

export interface IFilterSearchRes {
  count: IFilterSearchCount;
  provider: IFilterProviderRes[];
}

export interface IFilterSearchCount {
  total: number;
  virtualSite: number;
  homeVisit: number;
  inOffice: number;
}

export interface IFilterProviderRes {
  location: ILatLang;
  state: string[];
  category: string[];
  subcategory: string[];
  claimStatus: boolean;
  virtual: boolean;
  homeVisit: boolean;
  _id: string;
  siteIdentifier: string;
  name: string;
  website: string;
  address: string;
  city: string;
  zipcode: string;
  additional: boolean;
  userId: string;
  organisationId: IOrganization;
  categoryInfo: ICareCategory[];
}

interface IOrganization {
  hippa: boolean;
  _id: string;
  logo: string;
  about: string;
}

export interface IProviderDetailState {
  _id: string;
  name: string;
  hippa: boolean;
  totalAssigned: number;
  website: string;
  address: string;
  about: string;
  altWebsite: string;
  primaryAccountOwnerInfo: IProfile[];
  subProvider: IProfile[];
  sitesInfo: ISiteWithSubCategoryForProviderDetails[];
}

export interface IProviderListRequest {
  listingName: string;
  update: boolean;
  updatedName: string;
  stateLoc: string;
}

export interface ISaveToListRequest {
  saveListingId: string;
  siteId: string;
  organisationId: string;
}

export interface ISaveShareProviderRequest {
  name: string;
  url: string;
  count: number;
}

export interface IEditSaveShareProviderRequest {
  id: string;
  all: boolean;
  update: boolean;
  name: string;
  updatedName: string;
}

export interface IProvideFeedbackRequest {
  name: string;
  email: string;
  feedback: string;
  siteId: string;
}
