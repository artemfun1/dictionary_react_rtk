import clsx from "clsx";
import { Link } from "react-router-dom";
import { IDictionaryState } from "../../redux/dictionsSlice";
import module from "./dictionaryItem.module.scss";

export interface IDictionaryCard {
	key: number;
	card: IDictionaryState;
}

export const DictionaryItem: (props: IDictionaryCard) => any = ({ card }) => {
	return (
		<div className={clsx(module.root, "card")}>
			<img src={card.imgDic} className="card-img-top" alt="картинка" />

			<div className="card-body">
				<h5 className="card-title">{card.nameDic}</h5>
				<p>В словарике {card.numItemsInDic} слов</p>
				<Link to="edit">
					<button className="btn btn-primary">Открыть словарик</button>
				</Link>
			</div>
		</div>
	);
};
