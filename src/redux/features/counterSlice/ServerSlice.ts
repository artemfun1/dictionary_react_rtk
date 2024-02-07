import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store/store";

interface ICounter {
	id: number;
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	value: number;
}

const initialState: { obj: ICounter } = {
	obj: { id: 0, status: "idle", error: null, value: 0 },
};

export const getFetchCount = createAsyncThunk(
	"counter/getFetchCount",
	async () => {
		try {
			const response = await axios.get(
				"https://cd13ad256aa86858.mokky.dev/count"
			);
			return response.data[0];
		} catch (error) {
			console.log(error);
		}
	}
);

export const decrementFetchCount = createAsyncThunk(
	"counter/decrementFetchCount",
	async (_, { dispatch, getState }) => {
		const { count } = getState() as { count: { obj: ICounter } };
		const newState = {
			...count.obj,
			value: count.obj.value - 1,
		};
		try {
			const newObj = await axios.patch(
				"https://cd13ad256aa86858.mokky.dev/count/0",
				newState
			);
			console.log(newObj.data);
			dispatch(decrement(newObj.data));
		} catch (error) {
			console.log(error);
		}
	}
);
export const incrementFetchCount = createAsyncThunk(
	"counter/incrementFetchCount",
	async (_, { dispatch, getState }) => {
		const { count } = getState() as { count: { obj: ICounter } };
		const newState = { ...count.obj, value: count.obj.value + 1 };
		try {
			const newObj = await axios.patch(
				"https://cd13ad256aa86858.mokky.dev/count/0",
				newState
			);
			dispatch(increment(newObj.data));
		} catch (error) {
			console.log(error);
		}
	}
);

export const editCounter = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment: (state: { obj: ICounter }, action: PayloadAction<ICounter>) => {
			state.obj.value = action.payload.value;
		},
		decrement: (state: { obj: ICounter }, action: PayloadAction<ICounter>) => {
			state.obj.value = action.payload.value;
		},
		setCount: (state: { obj: ICounter }, action: PayloadAction<ICounter>) => {
			state.obj.value = action.payload.value;
		},
	},

	extraReducers: getCountReducer => {
		getCountReducer
			.addCase(getFetchCount.pending, state => {
				state.obj.status = "loading";
				console.log("pending", state.obj.status);
			})
			.addCase(getFetchCount.fulfilled, (state, action) => {
				state.obj.status = "succeeded";
				console.log("fulfilled", state.obj.status, action.payload);
				state.obj.value = action.payload.value;
				state.obj.status = "idle";
			})
			.addCase(getFetchCount.rejected, state => {
				state.obj.status = "failed";
				console.log("rejected");
			});
	},
});

export const selectCount = (state: RootState) => state.count.obj;

export const { increment, decrement, setCount } = editCounter.actions;

export default editCounter.reducer;
