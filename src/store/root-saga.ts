import { all, fork } from "redux-saga/effects";
import { saga as globalSaga } from "./global";
import { saga as categorySaga } from "./category";
import { saga as authSaga } from "./auth";
import { saga as providerSaga } from "./provider";
import { saga as quizSaga } from "./quiz";
import { saga as mapSaga } from "./map";
import { saga as messagesSaga } from "./messages";

export default function* rootSaga() {
  yield all([
    fork(globalSaga),
    fork(authSaga),
    fork(categorySaga),
    fork(providerSaga),
    fork(quizSaga),
    fork(mapSaga),
    fork(messagesSaga),
  ]);
}
