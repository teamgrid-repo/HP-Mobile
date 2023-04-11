import { ISignupProviderRequest, ISignupUserRequest } from "src/shared";
import { RootAction } from "../root-action";
import {
  DELETE_ADDITIONAL_MEMEMBER_SUCCESS,
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

const initSignupProviderRequest: ISignupProviderRequest = {
  name: "",
  firstName: "",
  lastName: "",
  jobTitle: "Senior Engineer",
  orgName: "Vine",
  howYouHeard: "from client",
  address: "test address",
  city: "test city",
  state: "test state",
  zipcode: "123123",
  email: "",
  password: "",
  confirmPassword: "",
  hippa: false,
  role: "provider",
  type: "web",
  socialToken: "",
};

const initSignupUserRequest: ISignupUserRequest = {
  name: "",
  email: "",
  role: "user",
  acceptTerms: false,
  optShareData: true,
  password: "",
  confirmPassword: "",
  userState: "GJ",
  type: "web",
};

const initialState: AuthState = {
  routeShareState: null,
  signupProviderRequest: initSignupProviderRequest,
  signupUserRequest: initSignupUserRequest,
  user: null,
  fcmToken: "",
  additionalMembers: [],
  organization: null,
  sites: [],
};

export const authReducer = (state: AuthState = initialState, action: RootAction): AuthState => {
  const { type, payload } = action;

  switch (type) {
    case SET_AUTH_STATE:
      return { ...state, ...payload };
    case SET_ROUTE_SHARE_STATE:
      return { ...state, routeShareState: { ...state.routeShareState, ...payload } };
    case RESET_SIGNUP_PROVIDER_REQUEST_STATE:
      return { ...state, signupProviderRequest: initSignupProviderRequest };
    case SET_SIGNUP_PROVIDER_REQUEST_STATE:
      return { ...state, signupProviderRequest: payload };
    case RESET_SIGNUP_USER_REQUEST_STATE:
      return { ...state, signupUserRequest: initSignupUserRequest };
    case SET_SIGNUP_USER_REQUEST_STATE:
      return { ...state, signupUserRequest: payload };
    case SET_USER_STATE:
      return { ...state, user: payload };
    case SET_ORGANIZATION_STATE:
      return { ...state, organization: payload };
    case SET_SITES_STATE:
      return { ...state, sites: payload };
    case SET_USER_PROFILE_STATE:
      return { ...state, user: state.user ? { ...state.user, profileId: payload } : state.user };
    case SET_ADDITAIONAL_MEMBERS_STATE:
      return { ...state, additionalMembers: payload };
    case DELETE_ADDITIONAL_MEMEMBER_SUCCESS:
      return {
        ...state,
        additionalMembers: state.additionalMembers.filter((item) => item._id !== payload),
      };
    default:
      return state;
  }
};
