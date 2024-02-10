import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { put, select } from "redux-saga/effects";

interface ICounter {
	id: number;
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	value: number;
}

const initialState: { obj: ICounter } = {
	obj: { id: 0, status: "idle", error: null, value: 0 },
};

export function* getCountSaga(): any {
	const response = yield axios.get("https://cd13ad256aa86858.mokky.dev/count");
	yield put(setCount(response.data[0]));
}

export function* decrementCountSaga(): any {
	const state = yield select();
	const newState = yield {
		...state.count.obj,
		value: state.count.obj.value - 1,
	};
	const newObj = yield axios.patch(
		"https://cd13ad256aa86858.mokky.dev/count/0",
		newState
	);
	yield put(decrement(newObj.data));
}

export function* incrementCountSaga(): any {
	const state = yield select();

	const newState = yield {
		...state.count.obj,
		value: state.count.obj.value + 1,
	};

	const newObj = yield axios.patch(
		"https://cd13ad256aa86858.mokky.dev/count/0",
		newState
	);
	yield put(increment(newObj.data));
}

export const GET_COUNT = "counter/getCount";
export const INC_COUNT = "counter/incCount";
export const DEC_COUNT = "counter/decCount";

export const getCount = createAction(GET_COUNT);
export const incCount = createAction(INC_COUNT);
export const decCount = createAction(DEC_COUNT);

export const editCounter = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment: (state: { obj: ICounter }, action: PayloadAction<ICounter>) => {
			state.obj.value = action.payload.value;
		},
		decrement: (state: { obj: ICounter }, action: PayloadAction<ICounter>) => {
			state.obj.value = action.payload.value;
		},
		setCount: (state: { obj: ICounter }, action: PayloadAction<ICounter>) => {
			state.obj.value = action.payload.value;
		},
	},

	// extraReducers: getCountReducer => {
	// 	getCountReducer
	// 		.addCase(getCountSaga.pending, state => {
	// 			// state.obj.status = "loading";
	// 			// console.log("pending", state.obj.status);
	// 		})
	// 		.addCase(getCountSaga.fulfilled, (state, action) => {
	// 			// state.obj.status = "succeeded";
	// 			// console.log("fulfilled", state.obj.status, action.payload);
	// 			state.obj.value = action.payload.value;
	// 			// state.obj.status = "idle";
	// 		})
	// 		.addCase(getCountSaga.rejected, state => {
	// 			// state.obj.status = "failed";
	// 			// console.log("rejected");
	// 		});
	// },
});

export const { setCount, increment, decrement } = editCounter.actions;

export default editCounter.reducer;
