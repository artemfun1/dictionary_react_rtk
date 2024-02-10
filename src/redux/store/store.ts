import { configureStore } from "@reduxjs/toolkit";

import cardIdReducer from "../features/cardIdSlice/cardIdSlice";
import counterReducer from "../features/counterSlice/counterSlice";
import dictionaryReducer from "../features/dictionarySlice/dictionsSlice";
import { sagaMiddleware } from '../Saga/createSaga'
import { sagasCount } from '../Saga/countSagas'
import { sagasDictionary } from '../Saga/dictionarySagas'

export const store = configureStore({
	reducer: {
		dictionaries: dictionaryReducer,
		cardId: cardIdReducer,
		count: counterReducer,
		
	},
	middleware: (getDefaultMiddleware)=> getDefaultMiddleware({thunk:false}).concat(sagaMiddleware)
})




sagaMiddleware.run(sagasCount)
sagaMiddleware.run(sagasDictionary)

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
