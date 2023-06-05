import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { collectionReducer } from './collectedMovieSlice'; 

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
//   whitelist: ['contacts'],
};

const rootReducer = combineReducers({
  collectedMovies: collectionReducer,
});

const persistedReduser = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReduser,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);