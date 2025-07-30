import React from "react";
import style from "./Login.module.css";
import { useForm } from "react-hook-form";
import { Button } from "@heroui/react";
import { useSelector } from "react-redux";
import { loginTC } from "../../Redux/MasterReducer";
import { RootState } from "../../Redux/Redux-store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Redux-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const dispatch: AppDispatch = useDispatch();
	let isAuth = useSelector((state: RootState) => state.loginData.isAuth);
	let loginData = useSelector((state: RootState) => state.loginData.loginData);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ defaultValues: { login: "", password: "" } });

	const realLogin = useSelector(
		(state: RootState) => state.loginData.loginData.login,
	);
	const realPassword = useSelector(
		(state: RootState) => state.loginData.loginData.password,
	);

	console.log(errors);

	// ИСПРАВИТЬ ANY !!!
	const navigate = useNavigate();

	const onSubmit = (data: any) => {
		debugger;
		console.log(realLogin);
		console.log(realPassword);
		if (data.login === realLogin && data.password === realPassword) {
			dispatch(loginTC());
		}
		navigate(`/pedestal/sevenWanders/0`);
	};
	return (
		<div className={style.loginBlock}>
			<h1 className={style.text}>Вход с правами мастера</h1>
			<br></br>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					// defaultValue="Введите логин"
					{...register("login", {
						required: "Это обязательное поле",
						minLength: { value: 4, message: "Минимальная длинна - 4 символа" },
					})}
					placeholder="Введите логин"
				/>
				<p>{errors.login?.message}</p>
				<br></br>
				<input
					type="password"
					{...register("password", {
						required: "Это обязательное поле",
						minLength: { value: 4, message: "Минимальная длинна - 4 символа" },
					})}
					placeholder="Введите пароль"
				/>
				{/* errors will return when field validation fails  */}
				{/* {errors.exampleRequired && <span>This field is required</span>} */}
				<p>{errors.password?.message}</p>
				<br></br>
				<Button type="submit">Войти</Button>
			</form>
		</div>
	);
};

export default Login;
