import { configureStore } from "@reduxjs/toolkit";

import dictionaryReducer from "../features/dictionsSlice";
import cardIdReducer from "../features/cardIdSlice";
import counterReducer, { increment, selectCount } from "../features/counterSlice";
import { useAppDispatch, useAppSelector } from './hooksRedux'

export const store = configureStore({
	reducer: {
		dictionaries: dictionaryReducer,
		cardId: cardIdReducer,
		count: counterReducer,
	},
})






export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
