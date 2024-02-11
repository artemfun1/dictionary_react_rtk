import { createSlice } from "@reduxjs/toolkit";

const initialState: { value: boolean } = {
	value: false,
};

export const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {
		setTrueLoading(state) {
      state.value = true
    },
		setFalseLoading(state) {
      state.value = false
    },
	},
});

export const { setTrueLoading, setFalseLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
