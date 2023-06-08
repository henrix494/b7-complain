import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
	value: {
		isSub: null,
	},
};

export const subState = createSlice({
	name: "isSub",
	initialState: initialState,
	reducers: {
		changeSub: (state, action) => {
			return {
				value: {
					isSub: action.payload,
				},
			};
		},
	},
});
export const { changeSub } = subState.actions;
export default subState.reducer;
