import React from "react";
import Pedestal from "./Pedestal";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Redux-store";
import style from "./Pedestal.module.css";

export const PedestalContainer = () => {
	const gamesList = useSelector((state: RootState) => state.gamesList);

	let gameElements = gamesList.gamesListData.map((e, i) => {
		return <Pedestal gameData={e} key={i} index={i} />;
	});

	return <section className={style.pedestalWrapper}>{gameElements}</section>;
};
