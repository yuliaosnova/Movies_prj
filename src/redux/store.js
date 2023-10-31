import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { genresApi } from "./genresSlice";
import { userSlice } from "./userSlice";


const rootReducer = combineReducers({
  [genresApi.reducerPath]: genresApi.reducer,
  user: userSlice.reducer,
});


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