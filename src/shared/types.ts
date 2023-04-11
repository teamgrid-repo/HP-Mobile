export type RoleType = "provider" | "user";
export type FilterType = "homeVisit" | "ino" | "virtual";
export type PriceType =
  | "Free"
  | "Discounted,Negotiable-rates"
  | "Market"
  | "Sliding-fee-scale"
  | "Medicaid";

export type MenuActionType = "save" | "print" | "share";
export type MenuSavedSearchActionType = "open" | "edit" | "share" | "delete";
export type MenuMyProvidersActionType = "view provider" | "get directions" | "delete";
export type MenuChatRoomActionType = "Leave Chat" | "Add Client" | "Remove Client" | "Delete Chat";
export type MenuSavedClientActionType = "message" | "remove";
export type MenuSavedActionType = "open" | "share" | "delete";
export type MenuAppointmentActionType =
  | "view request"
  | "accept request"
  | "reject request"
  | "view appointment"
  | "contact provider"
  | "get directions";
export type MenuSubUserActionType = "Edit" | "Resend Invite" | "View" | "Delete";
export type MenuSiteItemActionType = "Edit" | "View" | "Details" | "Delete";
export type QuizResultMenuActionType = "Save Quiz Results" | "See Providers" | "Email Quiz Results";
export type SavedSortType = "Default" | "Ascending" | "Descending";
export type AppointmentFilterType = "default" | "pending" | "cancelled" | "approved";
export type AuthType = "web" | "google" | "facebook" | "apple";
export type GenderType = "Male" | "Female";
export type MartialStatusType = "Married" | "Single";
export type YesNoType = "Yes" | "No";
export type YesNoType2 = "YES" | "NO";
export type SecureNotSecureType = "Secure" | "Not Secure/SomeWhat Secure";
export type LookingForQuestionType = "A CLIENT OR PATIENT" | "A FRIEND OR FAMILY MEMBER" | "MYSELF";
export type BasicSituationType =
  | "PREGNANT OR MIGHT BE PREGNANT."
  | "CURRENTLY PARENTING (A) CHILD(REN) UNDER AGE 2."
  | "EXPERIENCED PREGNANCY LOSS OR THE LOSS OF HER YOUNG CHILD."
  | "CONSIDERING BECOMING AN ADOPTIVE OR FOSTER CARE PARENT.";
export type PregnancyLossReasonType =
  | "HAD AN ABORTION."
  | "HAD A MISCARRIAGE, STILLBIRTH, OR DEATH OF AN INFANT."
  | "HAD A CHILD PLACED IN FOSTER CARE.";
export type AdoptionFosterType = "CONSIDERING ADOPTION." | "CONSIDERING BECOMING A FOSTER PARENT.";
export type FeelAboutPregnancyType =
  | "NOT SURE ABOUT CONTINUING THIS PREGNANCY."
  | "CONSIDERING ABORTION."
  | "TOOK THE FIRST ABORTION PILL, BUT NOW I AM HAVING REGRETS."
  | "PLANNING TO CARRY MY PREGNANCY TO TERM BUT I’M NOT SURE I CAN TAKE CARE OF MY CHILD.";
export type FeelAboutAbortionType =
  | "THIS MIGHT BE THE BEST DECISION FOR"
  | "BEEN TOLD BY A DOCTOR TO LOOK INTO ABORTION.";
export type SpecialQuestionType = "0" | "1" | "2";

export type SegOrganizationListingType = "Organization" | "Sites";
