import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { collectionReducer } from "./collectedMovieSlice";

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
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { genresApi } from "./genresSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  collectedMovies: collectionReducer,
  [genresApi.reducerPath]: genresApi.reducer,
});

const persistedReduser = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReduser,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

    genresApi.middleware,
  ],
});

export const persistor = persistStore(store);