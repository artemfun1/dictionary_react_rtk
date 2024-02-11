import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import {
	DocumentData,
	QueryDocumentSnapshot,
	collection,
	doc,
	getDocs,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { put, select } from "redux-saga/effects";
import { db } from "../../FireBase/InitFireBase";

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
	const dataSnapshot = yield getDocs(collection(db, "test_counter"));
	const dataList = yield dataSnapshot.docs.map(
		(doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => doc.data()
	);
	const response: ICounter = yield dataList[0];
	yield put(setCount(response));
}

export function* decrementCountSaga(): any {
	const state = yield select();
	const newObj:ICounter = yield {
		...state.count.obj,
		value: state.count.obj.value - 1,
	};

	const DocDBRef = yield doc(db, "test_counter", "3J2JKrEK2bbQ7v8m0BD1");

	yield setDoc(DocDBRef, {value: newObj.value },{ merge: true });

	yield put(decrement(newObj));
}

export function* incrementCountSaga(): any {
	const state = yield select();

	const newObj:ICounter = yield {
		...state.count.obj,
		value: state.count.obj.value + 1,
	};

	const DocDBRef = yield doc(db, "test_counter", "3J2JKrEK2bbQ7v8m0BD1");

	yield updateDoc(DocDBRef, {value: newObj.value });

	yield put(decrement(newObj));
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
