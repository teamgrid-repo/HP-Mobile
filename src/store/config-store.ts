import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { HERPLAN_STORE } from "src/shared";
import rootReducer, { RootState, history } from "./root-reducer";
import rootSaga from "./root-saga";

function configureAppStore(preloadedState: RootState) {
  const sagaMiddleware = createSagaMiddleware();
  const persistedReducer = persistReducer(
    {
      key: HERPLAN_STORE,
      version: 1,
      storage,
    },
    rootReducer
  ); // root reducer with router state

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
        },
      }).concat(sagaMiddleware, routerMiddleware(history)),
    preloadedState,
  });

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}

const initialState: RootState = undefined as unknown as RootState;
const { store, persistor } = configureAppStore(initialState);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export { store, persistor };
