import { AuthType, ICareCombineCategory, ISite, RoleType } from "..";

export interface IRouteShareState {
  previousRoute: string;
  isBackPrevious: boolean;
}

export interface ILoginReuqst {
  email: string;
  password: string;
  type: AuthType;
  socialToken: string;
  fcmToken: string;
}

export interface IUserResponse {
  role: RoleType;
  status: boolean;
  saved_user: any[];
  saved_provider: any[];
  freeze: boolean;
  _id: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  type: string;
  social_token: string;
  fcm_token: string;
  jwt_auth_token: string;
  jwt_token_expired: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  profileId: IProfile;
}

export interface IProfile extends IProfileNotification {
  _id: string;
  makeAccountPrimary: boolean;
  saveClientUserId: string[];
  passwordSent: boolean;
  name: string;
  firstName: string;
  lastName: string;
  howYouHeard: string;
  jobTitle: string;
  email: string;
  userId: string | Partial<IUserResponse>;
  organization: string;
  hippa: boolean;
  approvedStatus: string;
  identity: string;
  acceptProviderTermsDate: string;
  contact: string;
  dob: string;
  gender: string;
  religion: string;
  occupation: string;
  martialStatus: string;
  totalAssigned: number;
  siteInfo: ISite[];
  approvalPending: boolean;
  searchResults: boolean;
  image: string;
  rec?: boolean;
  recText?: string;
  method?: string;
  createdUser?: string;
}

export interface IProfileNotification {
  message: boolean;
  textMessage: boolean;
  EmailMessage: boolean;
  appNotification: boolean;
  appointments: boolean;
  communication: boolean;
  optShareData: boolean;
}

export interface ISignupProviderRequest {
  name: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  orgName: string;
  howYouHeard: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  email: string;
  password: string;
  confirmPassword?: string;
  hippa: boolean;
  role: RoleType;
  type: AuthType;
  socialToken?: string;
}

export interface ISignupUserRequest {
  name: string;
  email: string;
  role: RoleType;
  acceptTerms: boolean;
  optShareData: boolean;
  password: string;
  confirmPassword?: string;
  userState: string;
  type: AuthType;
  socialToken?: string;
}

export interface IResetPasswordRequest {
  code: string;
  password: string;
  confirmPassword?: string;
}

export interface IPasswordChangeRequest {
  currentPassword: string;
  password: string;
  confirmPassword?: string;
}

export interface IGetProfileRequest {
  _id: string;
  role: string;
  email: string;
}

export interface IResendInviteRequest {
  email: string;
}

export interface IPrfoileUpdateRequest {
  name: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  contact: string;
  makeAccountPrimary: boolean;
  hippa?: boolean;
  organisationId?: string;
  userId?: string;
}

export interface IOrganization {
  about: string;
  address: string;
  altWebsite: string;
  approvedStatus: string;
  approvalPending: boolean;
  catInfo: ICareCombineCategory[];
  category: string[];
  city: string;
  contact: string;
  createdAt: string;
  email: string;
  geospan: any[];
  hippa: boolean;
  name: string;
  orgType: any[];
  poc: any[];
  providerId: IGetProfileRequest;
  publicName: string;
  publish: boolean;
  searchResults: boolean;
  state: string;
  subUserIncreasingLimit: boolean;
  subcategory: string[];
  totalAssigned: number;
  updatedAt: string;
  zipcode: string;
  __v: number;
  _id: string;
}
export interface IOrganizationRequest {
  providerId: string;
  publicName: string;
  address: string;
  zipcode: string;
  state: string;
  email: string;
  city: string;
  contact: string;
  about: string;
  category: string[];
  subcategory: string[];
  altWebsite: string;
}
