import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";

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

export const fetchCreateDictionaryItem = createAsyncThunk(
	"dictionaries/fetchCreateDictionaryItem",
	async (newObj: IDictionaryState, { dispatch }) => {
		const resp = await axios.post(
			"https://79bfd0f11687a52a.mokky.dev/dic",
			newObj
		);
		dispatch(createDictionaryItem(resp.data));
	}
);

export const fetchGetDictionaryItems = createAsyncThunk(
	"dictionaries/fetchGetDictionaryItems",
	async (_, { dispatch }) => {
		const resp = await axios.get("https://79bfd0f11687a52a.mokky.dev/dic");
		dispatch(setDictionaryItems(resp.data));
	}
);

export const fetchAddWordItem = createAsyncThunk(
	"dictionaries/fetchAddWordItem",
	async (newObj: IDictionaryState, { dispatch }) => {
		await axios.patch(
			`https://79bfd0f11687a52a.mokky.dev/dic/${newObj.id}`,
			newObj
		);
		dispatch(addWordInDic(newObj));
	}
);

export const fetchDeleteDicItem = createAsyncThunk(
	"dictionaries/fetchAddWordItem",
	async (obj: IDictionaryState, { dispatch }) => {
		await axios.delete(`https://79bfd0f11687a52a.mokky.dev/dic/${obj.id}`);
		dispatch(deleteDicItem(obj));
	}
);

export const fetchDeleteAll = createAsyncThunk(
	"dictionaries/fetchDeleteAll",
	async (_, { dispatch }) => {
		await axios.patch(`https://79bfd0f11687a52a.mokky.dev/dic/`, []);
		dispatch(deleteAll());
	}
);

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

export const selectDictionary = (state: RootState) => state.dictionaries;

export const {
	createDictionaryItem,
	setDictionaryItems,
	addWordInDic,
	deleteDicItem,
	deleteAll,
} = dictionarySlice.actions;

export default dictionarySlice.reducer;

