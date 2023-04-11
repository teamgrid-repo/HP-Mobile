import { RoleType } from "../types";
import { IProfile, IUserResponse } from "./auth";
import { ICareSubCategory } from "./category";
import { ISite, ISiteSubCategoryInfo } from "./site";

export interface IAppointment {
  _id: string;
  canceledByData: IClientData[];
  clientData: IClientData;
  clientId: IUserResponse;
  date: string;
  profileData: IProfile;
  providerId: string;
  service: ISiteSubCategoryInfo;
  siteData: ISite;
  status: string;
  subCategoryData: ICareSubCategory;
  room: any;
}

export interface IClientData {
  _id: string;
  role: RoleType;
  name: string;
  email: string;
  contact: string;
}

export interface IBookAppointmentRequest {
  clientId: string;
  siteId: string;
  subCategoryId: string;
  date: string;
  providerId: string;
}

export interface IUpdateAppointmentRequest {
  status: string;
  providerId: string;
}
