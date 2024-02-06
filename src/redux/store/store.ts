import { configureStore } from "@reduxjs/toolkit";

import cardIdReducer from "../features/cardIdSlice";
import counterReducer from "../features/counterSlice";
import dictionaryReducer from "../features/dictionsSlice";

export const store = configureStore({
	reducer: {
		dictionaries: dictionaryReducer,
		cardId: cardIdReducer,
		count: counterReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
