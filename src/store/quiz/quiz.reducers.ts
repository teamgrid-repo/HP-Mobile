import { IQuizAnswerState } from "src/shared";
import { RootAction } from "../root-action";
import {
  DELETE_SAVED_QUIZ_SUCCESS,
  SET_QUIZ_ANSWER_STATE,
  SET_SAVED_QUIZZES_SORT_BY_STATE,
  SET_SAVED_QUIZZES_SUCCESS,
} from "./quiz.actiontypes";
import { QuizState } from "./quiz.models";

export const initQuizAnswer: IQuizAnswerState = {
  1: { q1: "" },
  2: {
    mainAns: 0,
    q1: "",
    q11: "",
    q12: "",
    q13: "",
    q14: "",
    q111: "",
    q112: "",
    spq: { 0: false, 1: false, 2: false },
  },
  3: { q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "", q8: "" },
  4: { q1: "", q2: "", q3: "", q4: "", q5: "", q6: "" },
};

const initialState: QuizState = {
  quizAnswerState: initQuizAnswer,
  savedQuizzes: [],
  savedQuizzesSortBy: "Default",
};

export const quizReducer = (state: QuizState = initialState, action: RootAction): QuizState => {
  const { type, payload } = action;

  switch (type) {
    case SET_QUIZ_ANSWER_STATE:
      return { ...state, quizAnswerState: payload };
    case SET_SAVED_QUIZZES_SUCCESS:
      return { ...state, savedQuizzes: payload };
    case DELETE_SAVED_QUIZ_SUCCESS:
      return {
        ...state,
        savedQuizzes: state.savedQuizzes.filter((savedQuiz) => savedQuiz._id !== payload),
      };
    case SET_SAVED_QUIZZES_SORT_BY_STATE:
      return { ...state, savedQuizzesSortBy: payload };
    default:
      return state;
  }
};
