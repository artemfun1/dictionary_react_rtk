import { configureStore } from "@reduxjs/toolkit";

import cardIdReducer from "../features/cardIdSlice/cardIdSlice";
import counterReducer from "../features/counterSlice/counterSlice";
import dictionaryReducer from "../features/dictionarySlice/dictionsSlice";
import { countApi } from "../features/counterSlice/countApi";

export const store = configureStore({
	reducer: {
		dictionaries: dictionaryReducer,
		cardId: cardIdReducer,
		count: counterReducer,
		[countApi.reducerPath]: countApi.reducer,
	},
	middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(countApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
