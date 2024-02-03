import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store/store";



export interface IOpenState {
	bool:boolean;
	func: Function
}

const initialState: IOpenState = {
  value: 
}

export const dictionarySlice = createSlice({
	name: "dictionaries",
	initialState,
	reducers: {
		createDictionary: (state:Array<IDictionaryState>, action: PayloadAction<IDictionaryState>) => {
			return [...state, action.payload]
		  
		},
	},
});

export const selectDictionary = (state: RootState) => state.dictionaries

export const { createDictionary,  } = dictionarySlice.actions;

export default dictionarySlice.reducer;



// imgDic: "",
// 		nameDic: "",
// 		numItemsInDic: 0,
// 		itemsDic: [{ isp: "", rus: "", eng: "" }],


	// removeDictionary: (state, action: PayloadAction<IDictionaryState>) => {
		// 	console.log(action)
		// 	state.push(action.payload)
		// },