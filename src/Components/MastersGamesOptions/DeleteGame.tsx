import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Redux-store";
import { Button } from "@heroui/react";
import style from "./DeleteGame.module.css";
import { deleteGameTC, GameDataType } from "../../Redux/GamesListReducer";
import { useNavigate } from "react-router-dom";

export const DeleteGame: React.FC<GameDataType> = (props: GameDataType) => {
	const dispatch: AppDispatch = useDispatch();

	// const gamesList = useSelector(
	// 	(state: RootState) => state.gamesList.gamesListData,
	// );

	const [gameIdToDelete, setGameIdToDelete] = useState<string | null>(null);

	const [gameTitleToDelete, setGameTitleToDelete] = useState<string>("");

	const handleDeleteClick = (id: string, title: string) => {
		setGameIdToDelete(props.id); // Устанавливаем ID игры для удаления
		setGameTitleToDelete(props.title); // Устанавливаем название для отображения в модальном окне
	};

	// Функция, вызываемая при отмене удаления в модальном окне
	const handleCancelDelete = () => {
		setGameIdToDelete(null); // Скрываем модальное окно, не удаляя игру
		setGameTitleToDelete(""); // Очищаем название
	};

	const handleConfirmDelete = () => {
		if (gameIdToDelete) {
			dispatch(deleteGameTC(gameIdToDelete));
			setGameIdToDelete(null);
			setGameTitleToDelete("");
		}
	};

	// const deletingList = gamesList.map((e) => (
	// 	<div key={e.id} className={style.gameItem}>
	// 		<span>{e.title}</span>{" "}
	// 		<Button onPress={() => handleDeleteClick(e.id, e.title)}>Удалить</Button>
	// 	</div>
	// ));

	const navigate = useNavigate();

	const closeDelete = () => {
		navigate(`/`);
	};

	return (
		<div className={style.deleteBlock}>
			{/* <h2>Список игр для удаления:</h2>
			{deletingList} */}

			{gameIdToDelete && (
				<div className={style.overlay}>
					{" "}
					{/* Затемнение фона */}
					<div className={style.confirmationDialog}>
						<h3>Подтвердите удаление</h3>
						<p>
							Вы уверены, что хотите удалить игру "
							<strong>{gameTitleToDelete}</strong>"?
						</p>
						<div className={style.dialogActions}>
							<Button onPress={handleConfirmDelete}>Удалить</Button>
							<Button onPress={handleCancelDelete}>Отмена</Button>
						</div>
					</div>
				</div>
			)}
			<Button onPress={closeDelete}>Закрыть режим удаления</Button>
		</div>
	);
};
