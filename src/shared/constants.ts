import states from "states-us";
import {
  AppointmentFilterType,
  GenderType,
  MartialStatusType,
  MenuActionType,
  MenuAppointmentActionType,
  MenuMyProvidersActionType,
  MenuSavedActionType,
  MenuSavedClientActionType,
  MenuSavedSearchActionType,
  MenuSubUserActionType,
  PriceType,
  QuizResultMenuActionType,
  SavedSortType,
  SecureNotSecureType,
  SegOrganizationListingType,
  YesNoType,
  YesNoType2,
} from "./types";
import {
  IAdoptionFosterType,
  IBasicSituation,
  IFeelAboutAbortion,
  IFeelAboutPregnancy,
  ILookingForQuestionType,
  IMenuItem,
  IPregnancyLossReasonType,
  ISpecialQuestion,
} from "./models";
import { PickerColumnOption } from "@ionic/react";
import {
  AboutUsIcon,
  AppointmentsIcon,
  ClientsIcon,
  MessagesIcon,
  SavedQuizzesIcon,
  SavedSearchesIcon,
} from "./icons";

const prefix = import.meta.env.HERPLAN_PREFIX;
export const HERPLAN_STORE = `${prefix}_store`;
export const HERPLAN_WEB_URL = import.meta.env.HERPLAN_WEB_URL;
export const API_BASE_URL = HERPLAN_WEB_URL + "/api/v1";
export const HERPLAN_MAP_APIKEY = import.meta.env.HERPLAN_MAP_APIKEY;
export const HERPLAN_FACEBOOK_APPID = import.meta.env.HERPLAN_FACEBOOK_APPID;
export const HERPLAN_GOOGLE_IOS_CLIENT_ID = import.meta.env.HERPLAN_GOOGLE_IOS_CLIENT_ID;
export const HERPLAN_SINGLE_KEY = "HJI-C18185B0-E889-47BB-9371-8D1D51E68362";
export const HERPLAN_MAP_ID = `${prefix}_map`;
export const HERPLAN_APP_ID = import.meta.env.HERPLAN_APP_ID;
export const HERPLAN_SOCKET_URL = HERPLAN_WEB_URL;

export const STORAGE_LIST = {
  STORAGE_USER: `${prefix}_storage_user`,
};

export const PRIVACY_POLICY_LINK = HERPLAN_WEB_URL + "/privacy-policy";
export const ABOUT_US_LINK = HERPLAN_WEB_URL + "/about-us";
export const TERMS_OF_USE_LINK = HERPLAN_WEB_URL + "/terms-conditions";
export const HIPAA_LINK =
  "https://www.hhs.gov/hipaa/for-professionals/faq/190/who-must-comply-with-hipaa-privacy-standards/index.html";
export const DEFAULT_PROFILE_IMAGE = "https://ionicframework.com/docs/demos/api/avatar/avatar.svg";

export const SOCKET_ON_NEW_MESSAGE = "new_message";
export const SOCKET_ON_ALL_USER = "allUser";
export const SOCKET_EMIT_CLIENT_JOINED = "CLIENT_JOINED";
export const SOCKET_EMIT_NEW_USER = "newUser";
export const SOCKET_EMIT_SEND_MESSAGE = "sendMessage";

export const FACEBOOK_PERMISSIONS = ["email", "user_birthday", "user_photos", "user_gender"];
export const API_ROUTES = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forget-password",
  verifyForgotPassword: "/verify-forgot-password",
  // Single Api Key as token
  cureSubcategories: "/cure_subcategories",
  filterProvider: "/filter-provider",
  providerDetails: "/get-organisation",
  specialQualification: "/special-qualification",
  getAllStateLoc: "/get-all_stateLoc",
  uniqueStates: "/unique-states",
  createFeedBack: "/create-feedBack",
  contact: "/contact",
  siteImage: "/siteImage",
  emailQuiz: "/email-quiz",
  userStateLoc: "/user-stateLoc",

  // with user token
  getFeedback: "/get-feedback",
  addFeedback: "/create-feedback",
  deleteFeedback: "/delete-feedback",
  savedListing: "/savedListing",
  deleteSavedListing: "/savedListing-delete",
  savedListingItems: "/savedListingItems",
  savedListingItemsDelete: "/savedListingItems-delete",
  saveSearches: "/save-searches",
  getSaveSearches: "/get-save-searches",
  deleteSaveSearches: "/delete-save-searches",
  savedClient: "/saved-client",
  allAppointment: "/allAppointment",
  appointment: "/appointment",
  additionalMember: "/additional-member",
  createOrganization: "/create_organisation",
  additionalMemberProvider: "/additional-member-provider",
  resendInvite: "/resend-invite",
  getProvider: "/get_provider",
  getProfile: "/getProfile",
  organizationDetails: "/organisation_details",
  site: "/site",
  allocatedSubCategory: "/allocated-subCategory",
  updateProvider: "/update_provider",
  profile: "/profile",
  uploadImage: "/upload-image",
  changePassword: "/change-password",
  quiz: "/quiz",
  // for messages
  allRooms: "/message-allRoom",
  message: "/message",
  updateReadStatus: "/update-readStatus",
  messageRoom: "/message_room",
  leaveDeleteChat: "/leave-delete-chat",
  socketUpload: "/socket-upload",
};

export const USA_STATES = states;
export const GENDERS: GenderType[] = ["Male", "Female"];
export const MARITAL_STATUS_LIST: MartialStatusType[] = ["Married", "Single"];
export const PRICE_TYPE_LIST: PriceType[] = [
  "Free",
  "Discounted,Negotiable-rates",
  "Market",
  "Medicaid",
  "Sliding-fee-scale",
];
export const PROVIDER_ACTION_LIST: MenuActionType[] = ["save", "share", "print"];
export const SAVED_SEARCH_ACTION_LIST: MenuSavedSearchActionType[] = ["open", "edit", "delete"];
export const MY_PROVIDERS_ACTION_LIST: MenuMyProvidersActionType[] = [
  "view provider",
  "get directions",
  "delete",
];
export const SAVED_CLIENT_ACTION_LIST: MenuSavedClientActionType[] = ["message", "remove"];
export const QUIZITEM_ACTION_LIST: MenuSavedActionType[] = ["open", "share", "delete"];
export const APPOINTMENT_ACTION_LIST: MenuAppointmentActionType[] = [
  "view request",
  "accept request",
  "reject request",
];
export const SUBUSERITEM_ACTION_LIST: MenuSubUserActionType[] = [
  "View",
  "Edit",
  "Resend Invite",
  "Delete",
];
export const SAVED_SORT_TYPES: SavedSortType[] = ["Default", "Ascending", "Descending"];
export const APPOINTMENT_SORT_TYPES: AppointmentFilterType[] = [
  "default",
  "pending",
  "cancelled",
  "approved",
];
export const PROVIDER_QUIZRESULT_LIST: QuizResultMenuActionType[] = [
  "Save Quiz Results",
  "See Providers",
  "Email Quiz Results",
];
export const SEG_ORG_LIST: SegOrganizationListingType[] = ["Organization", "Sites"];
export const YES_NO_LIST: YesNoType[] = ["Yes", "No"];
export const YES_NO_LIST2: YesNoType2[] = ["YES", "NO"];
export const SECURE_NOTSECURE_LIST: SecureNotSecureType[] = [
  "Not Secure/SomeWhat Secure",
  "Secure",
];
export const LOOKING_FOR_QUESTIONS: ILookingForQuestionType[] = [
  { value: "A CLIENT OR PATIENT", text: "A Client or Patient" },
  { value: "A FRIEND OR FAMILY MEMBER", text: "A Friend or Family Member" },
  { value: "MYSELF", text: "Myself" },
];
export const PREGNANCY_LOSS_REASONS: IPregnancyLossReasonType[] = [
  { value: "HAD AN ABORTION.", text: "Had An Abortion." },
  {
    value: "HAD A MISCARRIAGE, STILLBIRTH, OR DEATH OF AN INFANT.",
    text: "Had A Miscarriage, Stillbirth, Or Death of An Infant.",
  },
  { value: "HAD A CHILD PLACED IN FOSTER CARE.", text: "Had A Child Placed In Foster Care." },
];
export const ADOPTION_FOSTER_CONDITIONS: IAdoptionFosterType[] = [
  { value: "CONSIDERING ADOPTION.", text: "Considering Adoption." },
  { value: "CONSIDERING BECOMING A FOSTER PARENT.", text: "Considering Becoming A Foster Parent." },
];
export const BASIC_SITUATIONS: IBasicSituation[] = [
  { value: "PREGNANT OR MIGHT BE PREGNANT.", text: "Pregnant or Might Be Pregnant" },
  {
    value: "CURRENTLY PARENTING (A) CHILD(REN) UNDER AGE 2.",
    text: "Currently Parenting (A) Child(ren) Under Age 2.",
  },
  {
    value: "EXPERIENCED PREGNANCY LOSS OR THE LOSS OF HER YOUNG CHILD.",
    text: "Experienced Pregnancy Loss Or The Loss of ${replace} Young Child.",
  },
  {
    value: "CONSIDERING BECOMING AN ADOPTIVE OR FOSTER CARE PARENT.",
    text: "Considering Becoming An Adoption Or Foster Care Parent.",
  },
];
export const FELL_ABOUT_PREGNANCIES: IFeelAboutPregnancy[] = [
  {
    value: "NOT SURE ABOUT CONTINUING THIS PREGNANCY.",
    text: "Not Sure About Continuing This Pregnancy.",
  },
  { value: "CONSIDERING ABORTION.", text: "Considering Abortion." },
  {
    value: "TOOK THE FIRST ABORTION PILL, BUT NOW I AM HAVING REGRETS.",
    text: "Took The First Abortion Pill, But Now ${replace1} Having Regrets.",
  },
  {
    value: "PLANNING TO CARRY MY PREGNANCY TO TERM BUT I’M NOT SURE I CAN TAKE CARE OF MY CHILD.",
    text: "Planning To Carry ${replace2} Pregnancy To Term But ${replace1} Not Sure ${replace3} Can Take Care of ${replace2} Child.",
  },
];
export const FELL_ABOUT_ABORTIONS: IFeelAboutAbortion[] = [
  {
    value: "THIS MIGHT BE THE BEST DECISION FOR",
    text: "${replace1} This Might Be The Best Decision For ${replace2}",
  },
  {
    value: "BEEN TOLD BY A DOCTOR TO LOOK INTO ABORTION.",
    text: "Been Told By A Doctor To Look Into Abortion.",
  },
];
export const SPECIAL_QUESTIONS: ISpecialQuestion[] = [
  {
    value: "0",
    text: "${replace1} Wanting Help With Birth Assistance And Education, Or Post-Partum And/Or Breastfeeding Support?",
  },
  {
    value: "1",
    text: "${replace2} Unborn Baby Have A Diagnosis of An Abnormal Disability Or Medical Condition?",
  },
  {
    value: "2",
    text: "${replace3} Want Information On Healthy Parenting?",
  },
];

export const MENU_LIST: IMenuItem[] = [
  {
    name: "Provider Lists",
    route: "/tabs/tab-dashboard/my-providers",
    icon: "",
    isWebLink: false,
    routerDirection: "forward",
    roleTypes: ["provider", "user"],
  },
  {
    name: "Saved Searches",
    route: "/tabs/tab-dashboard/saved-searches",
    icon: SavedSearchesIcon,
    isWebLink: false,
    routerDirection: "forward",
    roleTypes: ["provider", "user"],
  },
  {
    name: "Saved Quizzes",
    route: "/tabs/tab-dashboard/saved-quizzes",
    icon: SavedQuizzesIcon,
    isWebLink: false,
    routerDirection: "forward",
    roleTypes: ["provider", "user"],
  },
  {
    name: "Appointments",
    route: "/tabs/tab-dashboard/appointments",
    icon: AppointmentsIcon,
    isWebLink: false,
    routerDirection: "forward",
    roleTypes: ["provider", "user"],
  },
  {
    name: "Messages",
    route: "/tabs/tab-messages",
    icon: MessagesIcon,
    isWebLink: false,
    routerDirection: "forward",
    roleTypes: ["provider", "user"],
  },
  {
    name: "Clients",
    route: "/tabs/tab-dashboard/saved-clients",
    icon: ClientsIcon,
    isWebLink: false,
    routerDirection: "forward",
    roleTypes: ["provider"],
  },
  {
    name: "About Us",
    route: ABOUT_US_LINK,
    icon: AboutUsIcon,
    isWebLink: true,
    routerDirection: "forward",
    roleTypes: ["provider", "user"],
  },
];

export const CURRENT_YEAR = new Date().getFullYear();
export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const YEARS: PickerColumnOption[] = [...Array(100)].map((_, i) => ({
  text: (CURRENT_YEAR - i).toString(),
  value: CURRENT_YEAR - i,
}));
export const MONTHS: PickerColumnOption[] = [...Array(12)].map((_, i) => ({
  text: MONTH_NAMES[i],
  value: i,
}));
export const DAYS: PickerColumnOption[] = [...Array(31)].map((_, i) => ({
  text: (i + 1).toString(),
  value: i + 1,
}));
export const DISTANCE_MIN = 1;
export const DISTANCE_MAX = 100;
export const DEAFULT_MAP_CENTER = { lat: 37.007828, lng: -89.184265 };
export const DEAFULT_MAP_ZOOM = 4;

export const subCatIds = [
  "6246cff1cbec72bd7cdb43ef",
  "6246cff1cbec72bd7cdb43f1",
  "6246cff1cbec72bd7cdb43f3",
  "6246cff1cbec72bd7cdb43f5",
  "6246cff1cbec72bd7cdb43f7",
  "6246cff1cbec72bd7cdb43f9",
  "6246cff1cbec72bd7cdb43fb",
  "6246cff1cbec72bd7cdb43fd",
  "6246cff1cbec72bd7cdb43ff",
  "6246cff1cbec72bd7cdb4401",
  "6246cff1cbec72bd7cdb4403",
  "6246cff1cbec72bd7cdb4405",
  "6246cff1cbec72bd7cdb4407",
  "6246cff1cbec72bd7cdb4409",
  "6246cff1cbec72bd7cdb440b",
  "6246cff1cbec72bd7cdb440d",
  "6246cff1cbec72bd7cdb440f",
  "6246cff1cbec72bd7cdb4411",
  "6246cff1cbec72bd7cdb4413",
  "6246cff1cbec72bd7cdb4415",
  "6246cff1cbec72bd7cdb4417",
  "6246cff1cbec72bd7cdb4419",
  "6246cff1cbec72bd7cdb441b",
  "6246cff1cbec72bd7cdb441d",
  "6246cff1cbec72bd7cdb441f",
  "6246cff1cbec72bd7cdb4421",
  "6246cff1cbec72bd7cdb4423",
  "6246cff1cbec72bd7cdb4425",
  "6246cff1cbec72bd7cdb4427",
  "6246cff1cbec72bd7cdb4429",
  "6246cff1cbec72bd7cdb442b",
  "6246cff1cbec72bd7cdb442d",
];
