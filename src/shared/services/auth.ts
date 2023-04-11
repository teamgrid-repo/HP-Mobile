import axiosInt from "src/utils/callApi";
import { API_ROUTES } from "../constants";
import {
  ILoginReuqst,
  IOrganizationRequest,
  IPrfoileUpdateRequest,
  IResendInviteRequest,
  IResetPasswordRequest,
  ISignupProviderRequest,
  ISignupUserRequest,
  ISiteCreateRequest,
  ISiteSubCategoryInfoRequest,
  ISiteUpdateRequest,
} from "../models";

export class AuthService {
  constructor() {}

  static login(data: ILoginReuqst) {
    return axiosInt.post(API_ROUTES.login, data);
  }

  static register(data: ISignupProviderRequest | ISignupUserRequest) {
    return axiosInt.post(API_ROUTES.register, data);
  }

  static forgotPassword(data: any) {
    return axiosInt.post(API_ROUTES.forgotPassword, data);
  }

  static verifyForgotPassword(data: IResetPasswordRequest) {
    return axiosInt.post(API_ROUTES.verifyForgotPassword, data);
  }

  static createOrganization(data: IOrganizationRequest) {
    return axiosInt.post(API_ROUTES.createOrganization, data);
  }

  static createAdditionalMember(data: IPrfoileUpdateRequest) {
    return axiosInt.post(API_ROUTES.additionalMember, data);
  }

  static updateAdditionalMember(subUserId: string, userId: string, data: IPrfoileUpdateRequest) {
    return axiosInt.put(`${API_ROUTES.additionalMember}/${subUserId}/${userId}`, data);
  }

  static deleteAdditionalMember(subUserId: string) {
    return axiosInt.delete(`${API_ROUTES.additionalMember}/${subUserId}`);
  }

  static resendInvite(data: IResendInviteRequest) {
    return axiosInt.post(API_ROUTES.resendInvite, data);
  }

  /**
   * Create New Site by primary provider
   * @param data
   * @returns
   */
  static createSiteLocation(data: ISiteCreateRequest) {
    return axiosInt.post(API_ROUTES.site, data);
  }
  static updateSiteLocation(id: string, data: ISiteUpdateRequest) {
    return axiosInt.put(`${API_ROUTES.site}/${id}`, data);
  }
  static deleteSiteLocation(id: string) {
    return axiosInt.delete(`${API_ROUTES.site}/${id}`);
  }
  static addAllocatedSubCategory(data: any) {
    return axiosInt.post(API_ROUTES.allocatedSubCategory, data);
  }
}
