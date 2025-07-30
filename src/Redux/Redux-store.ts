import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
// import { reducer as formReducer } from 'redux-form'
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

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store = createStore(
//     reducers,
//     /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware))
// )

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore

// state.window._store_ = store;

// export default store;
