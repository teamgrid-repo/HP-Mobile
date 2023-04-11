import { AxiosResponse } from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { API_ROUTES } from "src/shared";
import axiosInt from "src/utils/callApi";
import { setLoading, handleError } from "../global";
import {
  getMessagesRequest,
  getRoomsRequest,
  setMessagesState,
  setRoomsState,
} from "./messages.actions";
import { GET_MESSAGES_REQUEST, GET_ROOMS_REQUEST } from "./messages.actiontypes";

function* getRooms(action: ReturnType<typeof getRoomsRequest>) {
  try {
    yield put(setLoading(action.type, true));
    const response: AxiosResponse<any> = yield call(() => axiosInt.get(API_ROUTES.allRooms));
    yield put(setRoomsState(response.data));
  } catch (error) {
    yield put(handleError(action.type, JSON.stringify(error)));
  } finally {
    yield put(setLoading(action.type, false));
  }
}

function* getMessages(action: ReturnType<typeof getMessagesRequest>) {
  const { type, payload } = action;
  try {
    yield put(setLoading(type, true));
    const response: AxiosResponse<any> = yield call(() =>
      axiosInt.get(`${API_ROUTES.message}?roomName=${payload}`)
    );
    yield put(setMessagesState(response.data));
  } catch (error) {
    yield put(handleError(type, JSON.stringify(error)));
  } finally {
    yield put(setLoading(type, false));
  }
}

export default function* categorySaga() {
  yield all([takeEvery(GET_ROOMS_REQUEST, getRooms), takeEvery(GET_MESSAGES_REQUEST, getMessages)]);
}
