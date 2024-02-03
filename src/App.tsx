import { Route, Routes } from "react-router";
import { AddDictionary } from "./components/AddDictionary";
import { EditPage } from './pages/EditPage'
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import { HomePage } from "./pages/HomePage";
import { useAppSelector } from "./redux/store/hooksRedux";
import module from "./scss/app.module.scss";
import { selectDictionary } from './redux/dictionsSlice'
import { useState } from 'react'

function App() {
	const [isOpen, setIsOpen] = useState(false)

	const dictionary = useAppSelector(selectDictionary);

	// https://img.freepik.com/free-photo/a-cupcake-with-a-strawberry-on-top-and-a-strawberry-on-the-top_1340-35087.jpg

	return (
		<div className={module.app}>
			<AddDictionary isOpen={isOpen} setIsOpen={setIsOpen} />
			<Header />
			<div className={module.page}>
				<Menu setIsOpen={setIsOpen} />
				<main className={module.main}>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/edit" element={<EditPage  />} />
					</Routes>
				</main>
			</div>
		</div>
	);
}

export default App;
