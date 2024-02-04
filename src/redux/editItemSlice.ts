import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDictionaryState } from "./dictionsSlice";
import { RootState } from "./store/store";

const initialState: IDictionaryState = {
	idDic: "",
	imgDic: "",
	nameDic: "",
	numItemsInDic: 0,
	itemsDic: [{ isp: "", rus: "", eng: "",itemId:"" }],
};

export const editItemsSlice = createSlice({
	name: "editItem",
	initialState,
	reducers: {
		createEditItem: (state:IDictionaryState, action: PayloadAction<IDictionaryState>) => {
			return {...action.payload};
		},
	},
});

export const selectEditItem = (state: RootState) => state.editItem;

export const { createEditItem } = editItemsSlice.actions;

export default editItemsSlice.reducer;

// imgDic: "",
// 		nameDic: "",
// 		numItemsInDic: 0,
// 		itemsDic: [{ isp: "", rus: "", eng: "" }],

// removeDictionary: (state, action: PayloadAction<IDictionaryState>) => {
// 	console.log(action)
// 	state.push(action.payload)
// },
