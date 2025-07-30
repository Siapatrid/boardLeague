import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Redux-store";
import { Button } from "@heroui/react";

export const ChangeGame: React.FC = () => {
	const gamesList = useSelector((state: RootState) => state.gamesList);

	const [isBlockVisible, setIsBlockVisible] = useState(false);

	const handleButtonClick = () => {
		setIsBlockVisible(!isBlockVisible);
	};
	let gameElements = gamesList.gamesListData.map((e) => (
		<Button onPress={handleButtonClick}>{e.title}</Button>
	));

	return (
		<div>
			<h1>Какую игру хочешь изменить?</h1>
			<div>{gameElements}</div>
		</div>
	);
};
