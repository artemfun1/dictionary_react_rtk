import { Route, Routes } from "react-router";

import { AddDictionary } from "./components/AddDictionary";
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import { EditPage } from "./pages/EditPage";
import { HomePage } from "./pages/HomePage";
import module from "./scss/app.module.scss";

function App() {
	return (
		<div className={module.app}>
			<Header />
			<div className={module.page}>
				<Menu />
				<main className={module.main}>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/edit" element={<EditPage />} />
					</Routes>
				</main>
			</div>
		</div>
	);
}
// {true && <AddDictionary />}
export default App;
