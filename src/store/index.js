import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import courseReducer from "./slices/courseSlice";
import interactionReducer from "./slices/interactionSlice";

export default configureStore({
	reducer: {
		user: userReducer,
		course: courseReducer,
		interaction: interactionReducer,
	},
});
