import { Link } from "react-router-dom";
import module from "./menu.module.scss";

export const Menu = ({ setIsOpen }: any) => {
	function handlerClick() {
		setIsOpen(true);
	}

	return (
		<aside className={module.root}>
			<Link to="dictionary_react_rtk">
				<button type="button" className="btn btn-primary buttons">
					Словари
				</button>
			</Link>

			<button onClick={handlerClick} type="button" className="btn btn-primary buttons">
				Добавить словарь
			</button>
		</aside>
	);
};
