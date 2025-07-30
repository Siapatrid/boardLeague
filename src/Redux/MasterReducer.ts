const SUCC_LOGIN = "SUCC_LOGIN";
const LOGOUT = "LOGOUT";

type LoginDataType = { login: string | null; password: string | null };

export type InitialStateType = {
	loginData: LoginDataType;
	isAuth: boolean;
};

let initialState: InitialStateType = {
	loginData: {
		login: "Luixo",
		password: "LuixoLuixo",
	},
	isAuth: false,
};

const masterReducer = (
	state: InitialStateType = initialState,
	action: any,
): InitialStateType => {
	switch (action.type) {
		case SUCC_LOGIN: {
			return {
				...state,
				isAuth: true,
			};
		}
		case LOGOUT: {
			return { ...state, isAuth: false };
		}
		default:
			return state;
	}
};

type loginACType = {
	type: typeof SUCC_LOGIN;
};

export const loginAC = (): loginACType => ({
	type: SUCC_LOGIN,
});

type logoutACType = {
	type: typeof LOGOUT;
};

export const logoutAC = (): logoutACType => ({
	type: LOGOUT,
});

export const loginTC = () => (dispatch: any) => {
	dispatch(loginAC());
};

export const logoutTC = () => (dispatch: any) => {
	dispatch(logoutAC());
};

export default masterReducer;
