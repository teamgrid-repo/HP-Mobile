import {
  IGetProfileRequest,
  IOrganization,
  IProfile,
  IRouteShareState,
  ISignupProviderRequest,
  ISignupUserRequest,
  ISite,
  IUserResponse,
} from "src/shared";
import {
  DELETE_ADDITIONAL_MEMEMBER_SUCCESS,
  GET_ADDITAIONAL_MEMBERS_REQUEST,
  GET_ORGANIZATION_REQUEST,
  GET_SITES_REQUEST,
  GET_USER_PROFILE_REQUEST,
  RESET_SIGNUP_PROVIDER_REQUEST_STATE,
  RESET_SIGNUP_USER_REQUEST_STATE,
  SET_ADDITAIONAL_MEMBERS_STATE,
  SET_AUTH_STATE,
  SET_ORGANIZATION_STATE,
  SET_ROUTE_SHARE_STATE,
  SET_SIGNUP_PROVIDER_REQUEST_STATE,
  SET_SIGNUP_USER_REQUEST_STATE,
  SET_SITES_STATE,
  SET_USER_PROFILE_STATE,
  SET_USER_STATE,
} from "./auth.actiontypes";
import { AuthState } from "./auth.models";

export const setAuthState = (payload: Partial<AuthState>) => ({
  type: SET_AUTH_STATE,
  payload,
});

export const setRouteShareState = (payload: Partial<IRouteShareState>) => ({
  type: SET_ROUTE_SHARE_STATE,
  payload,
});

export const resetSignupProviderRequestState = () => ({
  type: RESET_SIGNUP_PROVIDER_REQUEST_STATE,
});
export const setSignupProviderRequestState = (payload: ISignupProviderRequest) => ({
  type: SET_SIGNUP_PROVIDER_REQUEST_STATE,
  payload,
});

export const resetSignupUserRequestState = () => ({ type: RESET_SIGNUP_USER_REQUEST_STATE });
export const setSignupUserRequestState = (payload: ISignupUserRequest) => ({
  type: SET_SIGNUP_USER_REQUEST_STATE,
  payload,
});

export const setUserState = (payload: IUserResponse | null) => ({
  type: SET_USER_STATE,
  payload,
});

export const getUserProfileRequest = (payload: IGetProfileRequest) => ({
  type: GET_USER_PROFILE_REQUEST,
  payload,
});
export const setUserProfileState = (payload: IProfile) => ({
  type: SET_USER_PROFILE_STATE,
  payload,
});

export const getOrganizationRequest = (payload: string) => ({
  type: GET_ORGANIZATION_REQUEST,
  payload,
});
export const setOrganizationState = (payload: IOrganization) => ({
  type: SET_ORGANIZATION_STATE,
  payload,
});

export const getSitesRequest = (payload: { orgId: string, uid: string }) => ({
  type: GET_SITES_REQUEST,
  payload,
});
export const setSitesState = (payload: ISite[]) => ({
  type: SET_SITES_STATE,
  payload,
});

export const getAdditionalMembersRequest = (payload: string) => ({
  type: GET_ADDITAIONAL_MEMBERS_REQUEST,
  payload,
});
export const setAdditionalMembersState = (payload: IProfile[]) => ({
  type: SET_ADDITAIONAL_MEMBERS_STATE,
  payload,
});
export const deleteAdditionalMemberSuccess = (payload: string) => ({
  type: DELETE_ADDITIONAL_MEMEMBER_SUCCESS,
  payload,
});
