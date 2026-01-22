import style from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { NewGame } from "./Components/MastersGamesOptions/NewGame";
import { DeleteGame } from "./Components/MastersGamesOptions/DeleteGame";
import { HeroUIProvider } from "@heroui/react";
import { PedestalContainer } from "./Components/Pedestal/PedestalContainer";

function App() {
	return (
		<HeroUIProvider>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					height: "100vh",
				}}
			>
				<header style={{ background: "#222", padding: "1rem", color: "#fff" }}>
					<Header />
				</header>
				<div
					style={{
						display: "flex",
						flex: 1,
						alignContent: "flex-start",
					}}
				>
					<main className={style.main}>
						<Routes>
							<Route path="/login" element={<Login />} />
							<Route path="/newgame" element={<NewGame />} />
						</Routes>
						<PedestalContainer />
					</main>
				</div>
			</div>
		</HeroUIProvider>
	);
}

export default App;
