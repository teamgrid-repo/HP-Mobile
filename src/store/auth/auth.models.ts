import {
  IOrganization,
  IProfile,
  IRouteShareState,
  ISignupProviderRequest,
  ISignupUserRequest,
  ISite,
  IUserResponse,
} from "src/shared";

export interface AuthState {
  routeShareState: IRouteShareState | null;
  signupProviderRequest: ISignupProviderRequest;
  signupUserRequest: ISignupUserRequest;
  user: IUserResponse | null;
  fcmToken: string;
  // for profile
  additionalMembers: IProfile[];
  organization: IOrganization | null;
  sites: ISite[];
}
