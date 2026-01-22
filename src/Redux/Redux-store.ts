import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import gamesListReducer from "./GamesListReducer";
import masterReducer from "./MasterReducer";

export const store = configureStore({
	reducer: {
		gamesList: gamesListReducer,
		loginData: masterReducer,
	},
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

const thunkMiddleware = thunk;
