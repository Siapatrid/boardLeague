import style from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { NewGame } from "./Components/MastersGamesOptions/NewGame";
import { DeleteGame } from "./Components/MastersGamesOptions/DeleteGame";
import { HeroUIProvider } from "@heroui/react";
import { PedestalContainer } from "./Components/Pedestal/PedestalContainer";

// function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//         let location = useLocation()
//         let navigate = useNavigate()
//         let params = useParams()
//         return <Component {...props} router={{location, navigate, params}}/>
//     }
// }

function App() {
	return (
		// <div className='app-wrapper'>
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
					{/* <aside
						style={{
							width: "250px",
							background: "#333",
							color: "#fff",
							padding: "1rem",
						}}
					>
						<GamesList />
					</aside> */}
					{/*<div className='app-wrapper-content'>*/}
					<main className={style.main}>
						<Routes>
							{/* <Route path="/pedestal/*" element={<Pedestal />} /> */}
							<Route path="/login" element={<Login />} />
							<Route path="/newgame" element={<NewGame />} />
							<Route path="/deletegame" element={<DeleteGame />} />
						</Routes>
						<PedestalContainer />
					</main>
				</div>
			</div>
		</HeroUIProvider>
	);
}

export default App;
