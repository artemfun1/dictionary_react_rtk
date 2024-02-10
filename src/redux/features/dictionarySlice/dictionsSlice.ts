import {
	PayloadAction,
	createAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { put } from "redux-saga/effects";
import { RootState } from "../../store/store";

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
	const resp = yield axios.get("https://79bfd0f11687a52a.mokky.dev/dic");
	yield put(setDictionaryItems(resp.data));
}

export function* sagaCreateDictionaryItem(some: sagaProps): any {
	const newObj: IDictionaryState = yield some.payload;
	const resp = yield axios.post(
		"https://79bfd0f11687a52a.mokky.dev/dic",
		newObj
	);
	yield put(createDictionaryItem(resp.data));
}

export function* sagaAddWordItem(some: sagaProps): any {
	const newObj: IDictionaryState = yield some.payload;
	yield axios.patch(
		`https://79bfd0f11687a52a.mokky.dev/dic/${newObj.id}`,
		newObj
	);
	yield put(addWordInDic(newObj));
}

export function* sagaDeleteDicItem(some:sagaProps){
	const obj: IDictionaryState = yield some.payload;
	yield axios.delete(`https://79bfd0f11687a52a.mokky.dev/dic/${obj.id}`);
	yield	put(deleteDicItem(obj));
} 


export function* sagaDeleteAll(){
	yield  axios.patch(`https://79bfd0f11687a52a.mokky.dev/dic/`, []);
	 yield 	put(deleteAll());
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
export const deleteAllDicItem = createAction(DELETE_ALL_DICTIONARY_ITEM) 

export const selectDictionary = (state: RootState) => state.dictionaries;

export const {
	createDictionaryItem,
	setDictionaryItems,
	addWordInDic,
	deleteDicItem,
	deleteAll,
} = dictionarySlice.actions;

export default dictionarySlice.reducer;
