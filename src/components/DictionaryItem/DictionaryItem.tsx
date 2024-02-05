import clsx from "clsx";
import { Link } from "react-router-dom";
import { IDictionaryState } from "../../redux/features/dictionsSlice";
import { createCardId } from "../../redux/features/cardIdSlice";
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

	function calcNumItems() {
		if (card.itemsDic.length === 1 && !Boolean(card.itemsDic[0].itemId)) {
			return 0;
		}
		return card.itemsDic.length;
	}

	const numItems = calcNumItems();

	return (
		<div className={clsx(module.root, "card")}>
			<img src={card.imgDic} className="card-img-top" alt="картинка" />

			<div className="card-body">
				<h5 className="card-title">{card.nameDic}</h5>
				<p>В словарике {numItems} слов</p>
				<Link to="edit">
					<button onClick={() => handlerOpenEdit()} className="btn btn-primary">
						Открыть словарик
					</button>
				</Link>
			</div>
		</div>
	);
};
