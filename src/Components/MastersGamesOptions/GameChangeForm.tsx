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
		<div>
			{showForm && (
				<div className={style.newGameBlock}>
					<h1>Внести изменения</h1>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
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
						<br></br>
						<h1>I</h1>
						<input
							{...register("firstPlaceName", {
								// minLength: {
								// 	value: 4,
								// 	message: "Минимальная длинна - 4 символа",
								// },
							})}
							placeholder="Имя игрока (золото)"
						/>
						<> </>
						<input
							{...register("firstPlaceScore", {
								// minLength: {
								// 	value: 4,
								// 	message: "Минимальная длинна - 4 символа",
								// },
							})}
							placeholder="Счет игрока (золото)"
						/>

						<h1>II</h1>
						<input
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
							{...register("secondPlaceScore", {
								// minLength: {
								// 	value: 4,
								// 	message: "Минимальная длинна - 4 символа",
								// },
							})}
							placeholder="Счет игрока (серебро)"
						/>
						<h1>III</h1>
						<input
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
							{...register("thirdPlaceScore", {
								// minLength: {
								// 	value: 4,
								// 	message: "Минимальная длинна - 4 символа",
								// },
							})}
							placeholder="Счет игрока (бронза)"
						/>
						<br></br>
						<Button type="submit">Внести изменения</Button>
						<> </>
						<Button type="button" onClick={handleCancel}>
							Отменить изменения
						</Button>
					</form>
				</div>
			)}
		</div>
	);
};
