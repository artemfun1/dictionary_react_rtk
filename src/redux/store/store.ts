import { configureStore } from "@reduxjs/toolkit";


import dictionaryReducer from '../dictionsSlice'
import editItemReducer from '../editItemSlice'
import cardIdReducer from '../cardIdSlice'

export const store = configureStore({
	reducer: {
    dictionaries: dictionaryReducer,
		cardId: cardIdReducer,
		editItem: editItemReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
