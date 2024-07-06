import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import commentReducer from "./features/comment/commentSlice";
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
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import baseApi from "./api/baseApi";

const encryptor = encryptTransform({
  secretKey: "auth",
  onError: (error) => {
    console.error(error);
  },
});

const persistAuthLocalStorageConfig = {
  key: "auth",
  storage,
  transforms: [encryptor],
};

const persistedLocalAuthReducer = persistReducer(
  persistAuthLocalStorageConfig,
  authReducer
);
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedLocalAuthReducer,
    comments: commentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
