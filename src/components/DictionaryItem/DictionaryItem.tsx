import clsx from "clsx";
import { Link } from "react-router-dom";
import module from "./dictionaryItem.module.scss";

export const DictionaryItem = () => {
	return (
		<div className={clsx(module.root, "card")}>
			<img src="./img/12.png" className="card-img-top" alt="картинка" />

			<div className="card-body">
				<h5 className="card-title">Название словаря</h5>
        <p>В словарике 10 слов</p>
				<Link to="edit">
					<button className="btn btn-primary">Открыть словарик</button>
				</Link>
			</div>
		</div>
	);
};
