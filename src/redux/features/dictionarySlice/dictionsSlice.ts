import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import {
	DocumentData,
	QueryDocumentSnapshot,
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	getDocs,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { put, select } from "redux-saga/effects";
import { db } from "../../FireBase/InitFireBase";
import { RootState } from "../../store/store";
import { setFalseLoading, setTrueLoading } from "../loadingSlice/loadingSlice";

type sagaProps = {
	type: string;
	payload: IDictionaryItem;
};

export interface IDictionaryItem {
	rus: string;
	isp: string;
	eng: string;
	itemId: string;
}

export interface IDictionaryState {
	id: number | string;
	idDic: string;
	imgDic: string;
	nameDic: string;
	numItemsInDic: number;
	itemsDic: IDictionaryItem[];
}

const initialState: { arrayDictionaries: IDictionaryState[] } = {
	arrayDictionaries: [],
};

export function* sagaGetDictionaryItems(): any {
	const dataSnapshot = yield getDocs(collection(db, "dictionary_items"));

	const dataList = yield dataSnapshot.docs.map(
		(doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => doc.data()
	);

	const response: IDictionaryState[] = yield dataList[0].dicArray;

	yield put(setDictionaryItems(response));

	yield put(setFalseLoading());
}

export function* sagaCreateDictionaryItem(some: sagaProps): any {
	yield put(setTrueLoading());

	const newObj: IDictionaryState = yield some.payload;
	const docRef = yield doc(db, "dictionary_items", "all_items");
	yield updateDoc(docRef, { dicArray: arrayUnion(newObj) });
	yield put(createDictionaryItem(newObj));
	yield put(setFalseLoading());
}

export function* sagaAddWordItem(some: sagaProps): any {
	yield put(setTrueLoading());

	const newObj: IDictionaryState = yield some.payload;

	yield put(addWordInDic(newObj));

	const state = yield select(state => state.dictionaries.arrayDictionaries);

	const docRef = yield doc(db, "dictionary_items", "all_items");
	yield updateDoc(docRef, { dicArray: [...state] });

	yield put(setFalseLoading());
}

export function* sagaDeleteDicItem(some: sagaProps): any {
	yield put(setTrueLoading());
	const obj: IDictionaryState = yield some.payload;
	const docRef = yield doc(db, "dictionary_items", "all_items");
	yield updateDoc(docRef, { dicArray: arrayRemove(obj) });

	yield put(deleteDicItem(obj));
	yield setTimeout(() => {}, 1000);

	yield put(setFalseLoading());
}

export function* sagaDeleteAll(): any {
	yield put(setTrueLoading());

	const docRef = yield doc(db, "dictionary_items", "all_items");
	yield setDoc(docRef, { dicArray: [] });
	yield put(deleteAll());
	yield put(setFalseLoading());
}

export const dictionarySlice = createSlice({
	name: "dictionaries",
	initialState,
	reducers: {
		createDictionaryItem(
			state: { arrayDictionaries: IDictionaryState[] },
			action: PayloadAction<IDictionaryState>
		) {
			state.arrayDictionaries.push(action.payload);
		},
		setDictionaryItems(
			state: { arrayDictionaries: IDictionaryState[] },
			action: PayloadAction<IDictionaryState[]>
		) {
			state.arrayDictionaries = [...action.payload];
		},
		addWordInDic(
			state: { arrayDictionaries: IDictionaryState[] },
			action: PayloadAction<IDictionaryState>
		) {
			const obj = state.arrayDictionaries.find(
				item => item.idDic === action.payload.idDic
			);
			if (obj) {
				obj.itemsDic = [...action.payload.itemsDic];
			}
		},
		deleteDicItem(
			state: { arrayDictionaries: IDictionaryState[] },
			action: PayloadAction<IDictionaryState>
		) {
			const filteredArr = state.arrayDictionaries.filter(
				item => item.idDic !== action.payload.idDic
			);
			state.arrayDictionaries = [...filteredArr];
		},
		deleteAll(state: { arrayDictionaries: IDictionaryState[] }) {
			state.arrayDictionaries = [];
		},
	},
});

export const SET_DICTIONARY_ITEM = "dictionaries/sagaGetDictionaryItems";
export const CREATE_DICTIONARY_ITEM = "dictionaries/sagaCreateDictionaryItem";
export const ADD_WORD_DICTIONARY_ITEM = "dictionaries/sagaAddWordItem";
export const DELETE_DICTIONARY_ITEM = "dictionaries/sagaDeleteDicItem";
export const DELETE_ALL_DICTIONARY_ITEM = "dictionaries";

export const getDicItem = createAction(SET_DICTIONARY_ITEM);
export const createNewDicItem = createAction<IDictionaryState>(
	CREATE_DICTIONARY_ITEM
);
export const addWordItem = createAction<IDictionaryState>(
	ADD_WORD_DICTIONARY_ITEM
);
export const deleteSagaDicItem = createAction<IDictionaryState>(
	DELETE_DICTIONARY_ITEM
);
export const deleteAllDicItem = createAction(DELETE_ALL_DICTIONARY_ITEM);

export const selectDictionary = (state: RootState) => state.dictionaries;

export const {
	createDictionaryItem,
	setDictionaryItems,
	addWordInDic,
	deleteDicItem,
	deleteAll,
} = dictionarySlice.actions;

export default dictionarySlice.reducer;
