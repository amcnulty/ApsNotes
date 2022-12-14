import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistCombineReducers,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import notesReducer from '../features/notes/notesSlice';
import mazeReducer from '../features/maze/mazeSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

export const store = configureStore({
    reducer: persistCombineReducers(persistConfig, {
        notes: notesReducer,
        maze: mazeReducer
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        })
});

export const persistor = persistStore(store);
