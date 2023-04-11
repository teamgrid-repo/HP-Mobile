import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import { globalReducer } from "./global";
import { categoryReducer } from "./category";
import { authReducer } from "./auth";
import { providerReducer } from "./provider";
import { quizReducer } from "./quiz";
import { mapReducer } from "./map";
import { messagesReducer } from "./messages";
import storage from "redux-persist/lib/storage";
import { HERPLAN_STORE } from "src/shared";
import { RESET_STORE } from "./global/global.actiontypes";

export const history: History = createBrowserHistory();

const appReducer = combineReducers({
  router: connectRouter(history),
  global: globalReducer,
  category: categoryReducer,
  auth: authReducer,
  provider: providerReducer,
  quiz: quizReducer,
  map: mapReducer,
  messages: messagesReducer,
});

export type RootState = ReturnType<typeof appReducer>;

export default (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    storage.removeItem(`persist:${HERPLAN_STORE}`);
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
