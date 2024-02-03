import { configureStore } from "@reduxjs/toolkit";


import dictionaryReducer from '../dictionsSlice'

export const store = configureStore({
	reducer: {
    dictionaries: dictionaryReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
