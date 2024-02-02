import { Route, Routes } from "react-router";

import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import { EditList } from "./pages/EditPage";
import { Home } from "./pages/HomePage";
import module from "./scss/app.module.scss";
import { AddDictionary } from './components/AddDictionary'

function App() {
	return (
		<div className={module.app}>
			<Header />
			{true && <AddDictionary/>}
			<div className={module.page}>
				<Menu />
				<main className={module.main}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/edit" element={<EditList />} />
					</Routes>
				</main>
			</div>
		</div>
	);
}

export default App;
