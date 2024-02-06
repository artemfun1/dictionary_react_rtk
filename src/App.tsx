import { useState } from "react";
import { Route, Routes } from "react-router";
import { AddDictionary } from "./components/AddDictionary";
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import { EditPage } from "./pages/EditPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import module from "./scss/app.module.scss";

function App() {
	const [isOpenAddDic, setIsOpenAddDic] = useState(false);

	return (
		<div className={module.app}>
			<AddDictionary isOpen={isOpenAddDic} setIsOpen={setIsOpenAddDic} />
			<Header />
			<div className={module.page}>
				<Menu setIsOpen={setIsOpenAddDic} />
				<main className={module.main}>
					<Routes>
						<Route path="/dictionary_react_rtk" element={<HomePage />} />
						<Route path="/dictionary_react_rtk/edit" element={<EditPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</main>
			</div>
		</div>
	);
}

export default App;
