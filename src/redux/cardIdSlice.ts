import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store/store";

interface ICardIUd {
	value: string;
}

const initialState: ICardIUd = {
	value: "",
};

export const editCardId = createSlice({
	name: "cardId",
	initialState,
	reducers: {
		createCardId: (state: ICardIUd, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
	},
});

export const selectCardId = (state: RootState) => state.cardId.value;

export const { createCardId } = editCardId.actions;

export default editCardId.reducer;

// imgDic: "",
// 		nameDic: "",
// 		numItemsInDic: 0,
// 		itemsDic: [{ isp: "", rus: "", eng: "" }],

// removeDictionary: (state, action: PayloadAction<IDictionaryState>) => {
// 	console.log(action)
// 	state.push(action.payload)
// },
