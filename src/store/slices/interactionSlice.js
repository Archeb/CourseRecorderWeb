import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	messages: [{ messageId: "1", from: "老师", type: "recorderMessage", content: "上课啦！" }],
	sendMessageStatus: "idle",
	sendMessageRejectReason: "",
};

export const sendMessage = createAsyncThunk("interaction/sendMessage", async (message) => {
	return await window.CourseConnection.sendMessage(message);
});

const interactionSlice = createSlice({
	name: "interaction",
	initialState,
	reducers: {
		pushMessage: (state, action) => {
			state.messages.push(action.payload);
		},
	},
	extraReducers: {
		[sendMessage.pending]: (state, action) => {
			state.sendMessageStatus = "pending";
		},
		[sendMessage.fulfilled]: (state, action) => {
			state.sendMessageStatus = "idle";
		},
		[sendMessage.rejected]: (state, action) => {
			state.sendMessageStatus = "rejected";
			state.sendMessageRejectReason = action.payload;
		},
	},
});

export const { pushMessage } = interactionSlice.actions;

export default interactionSlice.reducer;
