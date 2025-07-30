import React from "react";
import style from "./NewGame.module.css";
import { useForm } from "react-hook-form";
import { Button } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Redux/Redux-store";
import { NavLink } from "react-router-dom";
import { addGameTC } from "../../Redux/GamesListReducer";
import { RootState } from "../../Redux/Redux-store";
import { useNavigate } from "react-router-dom";

export const NewGame: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const gamesList = useSelector(
		(state: RootState) => state.gamesList.gamesListData,
	);
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: { title: "", photo: "" } });

	const navigate = useNavigate();

	const onSubmit = (data: any) => {
		console.log(data);
		dispatch(addGameTC(data.title, data.photo));
		console.log(gamesList);
		navigate(`/`);
	};

	const handleCancel = () => {
		reset();
	};

	return (
		<div className={style.newGameBlock}>
			<h1>Добавление новой игры</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={style.wrapper}>
					<input
						{...register("title", {
							required: "Это обязательное поле",
							minLength: {
								value: 4,
								message: "Минимальная длинна - 4 символа",
							},
						})}
						placeholder="Название игры"
					/>
					<input
						{...register("photo", {
							minLength: {
								value: 4,
								message: "Минимальная длинна - 4 символа",
							},
						})}
						placeholder="Ссылкка на фото"
					/>
					{/* errors will return when field validation fails  */}
					{/* {errors.exampleRequired && <span>This field is required</span>} */}
					<NavLink to={`/`}>
						<Button type="submit">Добавить игру</Button>
					</NavLink>
					<NavLink to={`/`}>
						<Button type="button" onClick={handleCancel}>
							Отмена
						</Button>
					</NavLink>
				</div>
			</form>
		</div>
	);
};
