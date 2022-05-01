import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "disconnected",
	serverAddress: "wss://schooltest.qwq.moe:3300/ws",
	courseId: "",
	activities: [
		/*
		{ eventId: "1613", action: "courseBegin", content: "上课啦！" },
		{ eventId: "1614", action: "userEnter", content: "学生 金梭哈 已进入课堂" },
		{ eventId: "1618", action: "documentPageChange", content: "PPT 切换到第二页，点击回顾" },
		{ eventId: "1620", action: "webBrowse", content: "老师打开了网页 https://www.bnu.edu.cn" },
		{ eventId: "1621", action: "endCourse", content: "下课啦！" },
        */
	],
	currentScreenshot: "",
};

const courseSlice = createSlice({
	name: "course",
	initialState,
	reducers: {
		setCourseStatus: (state, action) => {
			state.status = action.payload;
		},
		setCourseId: (state, action) => {
			state.courseId = action.payload;
		},
		pushActivity: (state, action) => {
			state.activities.push(action.payload);
		},
		setCurrentScreenshot: (state, action) => {
			state.currentScreenshot = action.payload;
		},
	},
});

export const { setCourseStatus, setCourseId, pushActivity, setCurrentScreenshot } = courseSlice.actions;

export default courseSlice.reducer;
