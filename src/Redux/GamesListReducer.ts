import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "./Redux-store";

const ADD_GAME = "ADD_GAME";
const CHANGE_GAME = "CHANGE_GAME";
const DELETE_GAME = "DELETE_GAME";

type PlaceType = {
	name: string | null;
	score: number | null;
};

export type GameDataType = {
	firstPlace: PlaceType;
	secondPlace: PlaceType;
	thirdPlace: PlaceType;
	title: string;
	photo: string | undefined;
	id: string;
};

export type InitialStateType = {
	gamesListData: Array<GameDataType>;
};

let initialState: InitialStateType = {
	gamesListData: [
		{
			firstPlace: { name: "Ксюша", score: 122 },
			secondPlace: { name: "Серёжа", score: 104 },
			thirdPlace: { name: "Лёша", score: 97 },
			title: "7 чудес",
			photo: "https://travelhub.by/images/cache/news/175-970x0.jpg",
			id: "1",
		},
		{
			firstPlace: { name: "Егор", score: 105 },
			secondPlace: { name: "Саша К.", score: 98 },
			thirdPlace: { name: "Антон", score: 70 },
			title: "Серп",
			photo: "https://upload.wikimedia.org/wikipedia/ru/1/1a/Scythe_boxart.png",
			id: "2",
		},
		{
			firstPlace: { name: "Серёжа", score: 113 },
			secondPlace: { name: "Егор", score: 110 },
			thirdPlace: { name: "Наташа Лёша", score: 101 },
			title: "Великий западный путь",
			photo:
				"https://bigfriendlygames.com/wp-content/uploads/2023/10/Great-Western-Trail.jpg",
			id: "3",
		},
		{
			firstPlace: { name: "Антон", score: 128 },
			secondPlace: { name: "Виктор", score: 118 },
			thirdPlace: { name: "Саша К.", score: 110 },
			title: "Тираны подземья",
			photo:
				"https://media.lavkaigr.ru/catalog/2022/04/tirany-podzemia-nevozmozhnaia-igra.jpg",
			id: "4",
		},
	],
};

const gamesListReducer = (
	state: InitialStateType = initialState,
	action: any,
): InitialStateType => {
	function newId() {
		const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
		return id;
	}
	let nextId: number = state.gamesListData.length;
	switch (action.type) {
		case ADD_GAME: {
			let id = newId();
			return {
				...state,
				gamesListData: [
					...state.gamesListData,
					{
						firstPlace: { name: "", score: null },
						secondPlace: { name: "", score: null },
						thirdPlace: { name: "", score: null },
						title: action.payload.title,
						photo: action.payload.photo,
						id: id,
					},
				],
			};
		}
		case CHANGE_GAME: {
			return {
				...state,
				gamesListData: state.gamesListData.map((u) => {
					debugger;
					if (u.id === action.id) {
						return {
							...u,
							firstPlace: {
								name: action.payload.firstPlaceName,
								score: action.payload.firstPlaceScore,
							},
							secondPlace: {
								name: action.payload.secondPlaceName,
								score: action.payload.secondPlaceScore,
							},
							thirdPlace: {
								name: action.payload.secondPlaceName,
								score: action.payload.secondPlaceScore,
							},
							title: action.payload.title,
							photo: action.payload.photo,
						};
					}
					return u;
				}),
			};
		}
		case DELETE_GAME: {
			return {
				...state,
				gamesListData: state.gamesListData.filter(
					(game) => game.id !== action.id,
				),
			};
			console.log(state.gamesListData);
		}

		default:
			return state;
	}
};
type AddGamePayloadType = {
	title: title;
	photo: photo;
};

type addGameACType = {
	type: typeof ADD_GAME;
	payload: AddGamePayloadType;
};

type title = string;
type photo = string | null;

const addGameAC = (title: title, photo: photo): addGameACType => ({
	type: ADD_GAME,
	payload: { title, photo },
});

export const addGameTC = (title: title, photo: photo) => (dispatch: any) => {
	dispatch(addGameAC(title, photo));
};

type changeGameACType = {
	type: typeof CHANGE_GAME;
	id: string;
	payload: GameDataType;
};

const changeGameAC = (props: GameDataType, id: string): changeGameACType => ({
	type: CHANGE_GAME,
	id: id,
	payload: props,
});

export const changeGameTC =
	(props: GameDataType, id: string) => (dispatch: any) => {
		dispatch(changeGameAC(props, id));
	};

type deleteGameACType = {
	type: typeof DELETE_GAME;
	id: string;
};

const deleteGameAC = (id: string): deleteGameACType => ({
	type: DELETE_GAME,
	id: id,
});

type ActionDispatch = ThunkDispatch<RootState, unknown, Action>;

export const deleteGameTC = (id: string) => (dispatch: ActionDispatch) => {
	dispatch(deleteGameAC(id));
};

export default gamesListReducer;
