import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import uploadReducer from "./uploadSlice";
import commentReducer from "./commentSlice";
import notificationReducer from "./notificationSlice";
import appointmentReducer from "./appointmentSlice";
import sliderReducer from "./sliderSlice";
import serviceReducer from "./serviceSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  upload: uploadReducer,
  comment: commentReducer,
  notification: notificationReducer,
  slider: sliderReducer,
  appointment: appointmentReducer,
  service: serviceReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
