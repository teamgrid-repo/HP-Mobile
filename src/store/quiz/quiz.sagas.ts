import { AxiosResponse } from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { API_ROUTES, ISavedQuiz } from "src/shared";
import axiosInt from "src/utils/callApi";
import { handleError, setLoading } from "../global";
import { getSavedQuizzesRequest, setSavedQuizzesSuccess } from "./quiz.actions";
import { GET_SAVED_QUIZZES_REQUEST } from "./quiz.actiontypes";

function* getSavedQuizzes(action: ReturnType<typeof getSavedQuizzesRequest>) {
  try {
    yield put(setLoading(action.type, true));
    const response: AxiosResponse<ISavedQuiz[]> = yield call(() => axiosInt.get(API_ROUTES.quiz));
    yield put(setSavedQuizzesSuccess(response.data));
  } catch (error) {
    yield put(handleError(action.type, JSON.stringify(error)));
  } finally {
    yield put(setLoading(action.type, false));
  }
}

export default function* quizSaga() {
  yield all([takeEvery(GET_SAVED_QUIZZES_REQUEST, getSavedQuizzes)]);
}
