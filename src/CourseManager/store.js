import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import courseReducer from "./slices/courseSlice";

export default configureStore({
	reducer: {
		user: userReducer,
		course: courseReducer,
	},
});
