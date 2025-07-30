import React from "react";
import style from "./Header.module.css";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from "@heroui/react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Redux-store";
import { logoutTC } from "../../Redux/MasterReducer";

const Header: React.FC = () => {
	let isAuth: boolean = useSelector(
		(state: RootState) => state.loginData.isAuth,
	);

	return (
		<div className={style.header}>
			{isAuth === true ? (
				<Dropdown>
					<DropdownTrigger>
						<Button variant="bordered">Действия</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Static Actions">
						<DropdownItem key="new">
							<NavLink to={`/newgame`} className={style.loginButton}>
								Добавить новую игру
							</NavLink>
						</DropdownItem>
						<DropdownItem key="delete" className="text-danger" color="danger">
							<NavLink to={"/deletegame"}>Удалить игру</NavLink>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			) : null}
			<h1 className={style.mainTitle}>LUIXO'S BOARD LEAGUE</h1>
			{isAuth === false ? (
				<NavLink to={`/login`} className={style.loginButton}>
					<Button className={style.loginButton}>Войти</Button>
				</NavLink>
			) : (
				<NavLink to={`/pedestal/sevenWanders/0`} className={style.loginButton}>
					<Button className={style.loginButton} onClick={logoutTC}>
						Выход
					</Button>
				</NavLink>
			)}
		</div>
	);
};

export default Header;
