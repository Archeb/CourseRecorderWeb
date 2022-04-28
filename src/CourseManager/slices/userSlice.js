import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	nickname: "用户",
	studentNo: "202204280122",
	peferences: {
		theme: "light",
		browseMode: "pc",
		language: "zh-CN",
	},
};

export const setNickname = createAsyncThunk("user/setNickname", async (nickname) => {
	let newNickname = await window.CourseConnection.setNickname(nickname);
	return newNickname;
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: {
		[setNickname.fulfilled]: (state, action) => {
			state.nickname = action.payload;
		},
	},
});

export default userSlice.reducer;
