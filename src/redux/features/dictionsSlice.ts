import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface IDictionaryItem {
	isp: string;
	rus: string;
	eng: string;
	itemId: string;
}

export interface IDictionaryState {
	idDic: string;
	imgDic: string;
	nameDic: string;
	numItemsInDic: number;
	itemsDic: IDictionaryItem[];
}

const initialState: Array<IDictionaryState> = [];

export const dictionarySlice = createSlice({
	name: "dictionaries",
	initialState,
	reducers: {
		createDictionary: (
			state: Array<IDictionaryState>,
			action: PayloadAction<IDictionaryState>
		) => {
			if (state.length === 0) {
				return [...state, action.payload];
			} else {
				if (
					state.filter(obg => obg.idDic === action.payload.idDic).length === 0
				) {
					return [...state, action.payload];
				} else {
					const index = state.findIndex(item => {
						return item.idDic === action.payload.idDic;
					});
					state[index] = action.payload;
				}
			}
		},
		deleteDictionary: (
			state: Array<IDictionaryState>,
			action: PayloadAction<string>
		) => {
			const index = state.findIndex(item => {
				return item.idDic === action.payload;
			});
			state = state.splice(index,1)
		},
	},
});

export const selectDictionary = (state: RootState) => state.dictionaries;

export const { createDictionary, deleteDictionary } = dictionarySlice.actions;

export default dictionarySlice.reducer;

// https://79bfd0f11687a52a.mokky.dev/dic