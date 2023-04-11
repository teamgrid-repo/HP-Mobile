import { all, put, takeLatest } from "redux-saga/effects";
import { handleError as handleErrorRequest, setError } from "./global.actions";
import { HANDLE_ERROR } from "./global.actiontypes";

function* handleError(action: ReturnType<typeof handleErrorRequest>) {
  const { key, error } = action.payload;
  yield put(setError(key, error));
}

export default function* globalSaga() {
  yield all([takeLatest(HANDLE_ERROR, handleError)]);
}
