import { SavedSortType } from "src/shared";
import { IQuizAnswerState, ISavedQuiz } from "src/shared/models/quiz";
import {
  DELETE_SAVED_QUIZ_SUCCESS,
  GET_SAVED_QUIZZES_REQUEST,
  SET_QUIZ_ANSWER_STATE,
  SET_SAVED_QUIZZES_SORT_BY_STATE,
  SET_SAVED_QUIZZES_SUCCESS,
} from "./quiz.actiontypes";

export const setQuizAnswerState = (payload: Partial<IQuizAnswerState>) => ({
  type: SET_QUIZ_ANSWER_STATE,
  payload,
});

/**
 * Saved Quizzes
 */
export const getSavedQuizzesRequest = () => ({
  type: GET_SAVED_QUIZZES_REQUEST,
});
export const setSavedQuizzesSuccess = (payload: ISavedQuiz[]) => ({
  type: SET_SAVED_QUIZZES_SUCCESS,
  payload,
});
export const deleteSavedQuizSuccess = (payload: string) => ({
  type: DELETE_SAVED_QUIZ_SUCCESS,
  payload,
});
export const setSavedQuizzesSortByState = (payload: SavedSortType) => ({
  type: SET_SAVED_QUIZZES_SORT_BY_STATE,
  payload,
});
