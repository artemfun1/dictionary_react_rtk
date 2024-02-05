import { Link } from "react-router-dom";
import module from "./menu.module.scss";

export const Menu = ({ setIsOpen }: any) => {
	function handlerClick() {
		setIsOpen(true);
	}

	return (
		<aside className={module.root}>
			<Link to="/">
				<button type="button" className="btn btn-primary">
					Словари
				</button>
			</Link>

			<button onClick={handlerClick} type="button" className="btn btn-primary">
				Добавить словарь
			</button>
		</aside>
	);
};
