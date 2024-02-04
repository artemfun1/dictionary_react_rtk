import clsx from "clsx";
import { Link } from "react-router-dom";
import { createCardId } from "../../redux/cardIdSlice";
import { IDictionaryState } from "../../redux/dictionsSlice";
import { useAppDispatch } from "../../redux/store/hooksRedux";
import module from "./dictionaryItem.module.scss";

export interface IDictionaryCard {
	card: IDictionaryState;
}

export const DictionaryItem: (props: IDictionaryCard) => any = ({ card }) => {
	const dispatch = useAppDispatch();

	function handlerOpenEdit() {
		dispatch(createCardId(card.idDic));
	}

	return (
		<div className={clsx(module.root, "card")}>
			<img src={card.imgDic} className="card-img-top" alt="картинка" />

			<div className="card-body">
				<h5 className="card-title">{card.nameDic}</h5>
				<p>В словарике {card.numItemsInDic} слов</p>
				<Link to="edit">
					<button onClick={() => handlerOpenEdit()} className="btn btn-primary">
						Открыть словарик
					</button>
				</Link>
			</div>
		</div>
	);
};
