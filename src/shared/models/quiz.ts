import {
  AdoptionFosterType,
  BasicSituationType,
  FeelAboutAbortionType,
  FeelAboutPregnancyType,
  LookingForQuestionType,
  PregnancyLossReasonType,
  SecureNotSecureType,
  SpecialQuestionType,
  YesNoType,
  YesNoType2,
} from "../types";

export interface IQuizAnswerState {
  1: IStep1State;
  2: IStep2State;
  3: IStep3State;
  4: IStep4State;
}

export interface IStep1State {
  q1: LookingForQuestionType | "";
}

export interface IStep2State {
  mainAns: number;
  q1: BasicSituationType | "";
  q11: YesNoType2 | "";
  q12: YesNoType2 | "";
  q13: PregnancyLossReasonType | "";
  q14: AdoptionFosterType | "";
  q111: FeelAboutPregnancyType | "";
  q112: FeelAboutAbortionType | "";
  spq: { 0: boolean; 1: boolean; 2: boolean };
}
export interface IStep3State {
  q1: SecureNotSecureType | "";
  q2: SecureNotSecureType | "";
  q3: SecureNotSecureType | "";
  q4: SecureNotSecureType | "";
  q5: SecureNotSecureType | "";
  q6: SecureNotSecureType | "";
  q7: SecureNotSecureType | "";
  q8: SecureNotSecureType | "";
}

export interface IStep4State {
  q1: YesNoType | "";
  q2: YesNoType | "";
  q3: YesNoType | "";
  q4: YesNoType | "";
  q5: YesNoType | "";
  q6: YesNoType | "";
}

export interface IQuizAnswer {
  id: string;
  question: string;
  answer: string[];
}

export interface ILookingForQuestionType {
  value: LookingForQuestionType;
  text: string;
}

export interface IPregnancyLossReasonType {
  value: PregnancyLossReasonType;
  text: string;
}
export interface IAdoptionFosterType {
  value: AdoptionFosterType;
  text: string;
}

export interface IBasicSituation {
  value: BasicSituationType;
  text: string;
}

export interface IFeelAboutPregnancy {
  value: FeelAboutPregnancyType;
  text: string;
}
export interface IFeelAboutAbortion {
  value: FeelAboutAbortionType;
  text: string;
}
export interface ISpecialQuestion {
  value: SpecialQuestionType;
  text: string;
}
export interface IEmailQuizRequest {
  email: string;
  url: string;
}
export interface ISaveQuizRequest {
  name: string;
  url: string;
}

export interface ISavedQuiz {
  name: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  userId: string;
  __v: number;
  _id: string;
}
