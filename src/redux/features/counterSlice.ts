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

export const getFetchCount = createAsyncThunk(
	"counter/getFetchCount",
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const response = await axios.get(
				"https://cd13ad256aa86858.mokky.dev/count"
			);
			dispatch(setCount(response.data));
		} catch (error) {
			console.log(error);
		}
	}
);

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
		setCount: (state, action) => {
			state.value = action.payload[0].value;
		},
	},

	extraReducers: builder => {
		builder
			.addCase(getFetchCount.pending, () => {
				console.log("pending");
			})
			.addCase(getFetchCount.fulfilled, () => {
				console.log("fulfilled");
			})
			.addCase(getFetchCount.rejected, () => {
				console.log("rejected");
			});
	},
});

export const selectCount = (state: RootState) => state.count.value;

export const { increment, decrement, setCount } = editCounter.actions;

export default editCounter.reducer;
