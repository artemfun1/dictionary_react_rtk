import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { RootState } from "../store/store";

interface ICounter {
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	value: number;
}

const initialState: ICounter = {
	status: "idle",
	error: null,
	value: 0,
};

export const editCounter = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment: {
			reducer(state: ICounter, action: PayloadAction<any>) {
				state.value += action.payload.num;
			},
			prepare(num) {
				return {
					payload: {
						num,
					},
				};
			},
		},
		decrement: (state: ICounter) => {
			state.value -= 1;
		},
	},
});



export const fetchPosts = createAsyncThunk("count/fetchCount", async () => {
	try {
		const response = await axios.get("https://79bfd0f11687a52a.mokky.dev/dic");
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});






export const selectCount = (state: RootState) => state.count.value;

export const { increment, decrement } = editCounter.actions;

export default editCounter.reducer;
