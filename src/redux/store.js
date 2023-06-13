import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { collectionReducer } from "./collectedMovieSlice";

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
import { userSlice } from "./userSlice";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
//   whitelist: ['collectedMovies'], 
// };

const rootReducer = combineReducers({
//   collectedMovies: collectionReducer,
  [genresApi.reducerPath]: genresApi.reducer,
  user: userSlice.reducer,
});

// const persistedReduser = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
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