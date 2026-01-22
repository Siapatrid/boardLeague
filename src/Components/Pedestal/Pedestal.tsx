import React, { useState } from "react";
import style from "./Pedestal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";
import { RootState, AppDispatch } from "../../Redux/Redux-store";
import { GameDataType } from "../../Redux/GamesListReducer";
import { GameChangeForm } from "../MastersGamesOptions/GameChangeForm";
import { deleteGameTC } from "../../Redux/GamesListReducer";

export type PedestalPropsType = {
	gameData: GameDataType;
	key: number;
	index: number;
};
export type GameIndexType = number;

const Pedestal: React.FC<PedestalPropsType> = (props: PedestalPropsType) => {
	const gamesList = useSelector(
		(state: RootState) => state.gamesList.gamesListData,
	);
	let gameIndex: GameIndexType = props.index;

	console.log(gamesList, gameIndex);

	const [isBlockVisible, setIsBlockVisible] = useState(false);

	// Исправить Any?
	const handleButtonClick = (event: any) => {
		setIsBlockVisible(!isBlockVisible);
	};

	let isAuth: boolean = useSelector(
		(state: RootState) => state.loginData.isAuth,
	);

	const dispatch: AppDispatch = useDispatch();

	const [gameIdToDelete, setGameIdToDelete] = useState<string | null>(null);

	const [gameTitleToDelete, setGameTitleToDelete] = useState<string>("");

	const handleDeleteClick = (id: string, title: string) => {
		setGameIdToDelete(id); // Устанавливаем ID игры для удаления
		setGameTitleToDelete(title); // Устанавливаем название для отображения в модальном окне
	};

	// // Функция, вызываемая при отмене удаления в модальном окне
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

	return (
		<div>
			{isBlockVisible && (
				<GameChangeForm
					firstPlace={{
						name: gamesList[gameIndex].firstPlace.name,
						score: gamesList[gameIndex].firstPlace.score,
					}}
					secondPlace={{
						name: gamesList[gameIndex].secondPlace.name,
						score: gamesList[gameIndex].secondPlace.score,
					}}
					thirdPlace={{
						name: gamesList[gameIndex].thirdPlace.name,
						score: gamesList[gameIndex].thirdPlace.score,
					}}
					title={gamesList[gameIndex].title}
					photo={gamesList[gameIndex].photo}
					id={gamesList[gameIndex].id}
				/>
			)}

			<div className={style.card}>
				<div className={style.card__inner}>
					<div className={style.card__front}>
						<Card className="py-4">
							<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
								{/*<p className="text-tiny uppercase font-bold">Daily Mix</p>*/}
								{/*<small className="text-default-500">12 Tracks</small>*/}
								<h4 className="font-bold text-large">
									{gamesList[gameIndex].title}
								</h4>
							</CardHeader>
							<CardBody className="overflow-visible py-2">
								<Image
									alt="Card background"
									className="object-cover rounded-xl"
									src={gamesList[gameIndex].photo}
									width={270}
								/>
							</CardBody>
						</Card>
					</div>
					<div className={style.card__back}>
						<div className={style.podiumBlock}>
							<div className={style.second}>
								<div className={style.name}>
									{gamesList[gameIndex].secondPlace.name}
								</div>
								<div className={style.score}>
									{gamesList[gameIndex].secondPlace.score}
								</div>
							</div>
							<div className={style.first}>
								<div className={style.name}>
									{gamesList[gameIndex].firstPlace.name}
								</div>
								<div className={style.score}>
									{gamesList[gameIndex].firstPlace.score}
								</div>
							</div>
							<div className={style.third}>
								<div className={style.name}>
									{gamesList[gameIndex].thirdPlace.name}
								</div>
								<div className={style.score}>
									{gamesList[gameIndex].thirdPlace.score}
								</div>
							</div>
							<div>
								{isAuth === true ? (
									<div>
										<div className={style.changeButton}>
											<Button onPress={handleButtonClick}>Изменить</Button>
										</div>
										<div>
											<Button
												className={style.deleteButton}
												onPress={() =>
													handleDeleteClick(
														props.gameData.id,
														props.gameData.title,
													)
												}
											>
												Удалить
											</Button>
											{gameIdToDelete && (
												<div className={style.overlay}>
													<div className={style.confirmationDialog}>
														<p>
															Вы уверены, что хотите удалить игру "
															<strong>{gameTitleToDelete}</strong>"?
														</p>
														<div className={style.dialogActions}>
															<Button
																onPress={handleConfirmDelete}
																className={style.deleteButton}
															>
																Да
															</Button>
															<Button onPress={handleCancelDelete}>
																Отмена
															</Button>
														</div>
													</div>
												</div>
											)}
										</div>
									</div>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Pedestal;
