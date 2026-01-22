import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Redux-store";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { changeGameTC } from "../../Redux/GamesListReducer";
import style from "../MastersGamesOptions/NewGame.module.css";
import { useNavigate } from "react-router-dom";
import { GameDataType } from "../../Redux/GamesListReducer";

export type PlaceholderType = "" | null;

export const GameChangeForm: React.FC<GameDataType> = (props: GameDataType) => {
	const [showForm, setShowForm] = useState(true);

	const dispatch: AppDispatch = useDispatch();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			title: props.title,
			photo: props.photo,
			firstPlaceName: props.firstPlace.name,
			firstPlaceScore: props.firstPlace.score,
			secondPlaceName: props.secondPlace.name,
			secondPlaceScore: props.secondPlace.score,
			thirdPlaceName: props.thirdPlace.name,
			thirdPlaceScore: props.thirdPlace.score,
		},
	});

	const onSubmit = (data: any) => {
		console.log(data);
		const formattedData = {
			...data,
			firstPlaceScore: data.firstPlaceScore
				? Number(data.firstPlaceScore)
				: null,
			secondPlaceScore: data.secondPlaceScore
				? Number(data.secondPlaceScore)
				: null,
			thirdPlaceScore: data.thirdPlaceScore
				? Number(data.thirdPlaceScore)
				: null,
		};
		dispatch(changeGameTC(formattedData, props.id));
		setShowForm(false);
		console.log();
	};

	const navigate = useNavigate();

	const handleCancel = () => {
		// Calling reset() with no arguments reverts the form
		// to the `defaultValues` provided during useForm initialization.
		reset();
		console.log("Form changes cancelled. Reverted to initial state.");
		setShowForm(false);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
			{showForm && (
				<div className="bg-grey p-8 rounded-lg shadow-xl max-w-xl w-full">
					<h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
						Внести изменения
					</h1>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="text-2xl font-bold text-center text-gray-800 mb-6"
					>
						<input
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							{...register("title", {
								required: "Это обязательное поле",
								// minLength: {
								// 	value: 4,
								// 	message: "Минимальная длинна - 4 символа",
								// },
							})}
							placeholder="Название игры"
						/>
						<p>{errors.title?.message}</p>
						<br></br>
						<input
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							{...register("photo", {
								// minLength: {
								// 	value: 4,
								// 	message: "Минимальная длинна - 4 символа",
								// },
							})}
							placeholder="Ссылкка на фото"
						/>
						{/* errors will return when field validation fails  */}
						{/* {errors.exampleRequired && <span>This field is required</span>} */}
						<div className="border-t border-gray-200 pt-4">
							<h2 className="text-lg font-semibold text-gray-700 mb-2">
								Золото
							</h2>
							<div className="flex gap-1">
								<input
									className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
									{...register("firstPlaceName", {
										// minLength: {
										// 	value: 4,
										// 	message: "Минимальная длинна - 4 символа",
										// },
									})}
									placeholder="Имя игрока (золото)"
								/>
								<input
									className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									{...register("firstPlaceScore", {
										// minLength: {
										// 	value: 4,
										// 	message: "Минимальная длинна - 4 символа",
										// },
									})}
									placeholder="Счет игрока (золото)"
								/>
							</div>
						</div>
						<h2 className="text-lg font-semibold text-gray-700 mb-2">
							Серебро
						</h2>
						<div className="flex gap-1">
							<input
								className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
								{...register("secondPlaceName", {
									// minLength: {
									// 	value: 4,
									// 	message: "Минимальная длинна - 4 символа",
									// },
								})}
								placeholder="Имя игрока (серебро)"
							/>
							<> </>
							<input
								className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
								{...register("secondPlaceScore", {
									// minLength: {
									// 	value: 4,
									// 	message: "Минимальная длинна - 4 символа",
									// },
								})}
								placeholder="Счет игрока (серебро)"
							/>
						</div>
						<h2 className="text-lg font-semibold text-gray-700 mb-2">Бронза</h2>
						<div className="flex gap-1">
							<input
								className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
								{...register("thirdPlaceName", {
									// minLength: {
									// 	value: 4,
									// 	message: "Минимальная длинна - 4 символа",
									// },
								})}
								placeholder="Имя игрока (бронза)"
							/>
							<> </>
							<input
								className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
								{...register("thirdPlaceScore", {
									// minLength: {
									// 	value: 4,
									// 	message: "Минимальная длинна - 4 символа",
									// },
								})}
								placeholder="Счет игрока (бронза)"
							/>
						</div>
						<div className="flex justify-center gap-4 mt-2">
							<Button className="flex-1" type="submit">
								Внести изменения
							</Button>
							<Button className="flex-1" type="button" onClick={handleCancel}>
								Отменить изменения
							</Button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};
