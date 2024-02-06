import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddWordItem } from "../components/AddWordItem";
import { WordItem } from "../components/WordItem";
import { selectCardId } from "../redux/features/cardIdSlice";
import { fetchDeleteDicItem } from "../redux/features/dictionsSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooksRedux";
import module from "../scss/editPage.module.scss";

export const EditPage = () => {
	const [addIsOpen, setAddIsOpen] = useState(false);

	const dictionaryObjects = useAppSelector(
		state => state.dictionaries.arrayDictionaries
	);

	const dispatch = useAppDispatch();

	const cardId = useAppSelector(selectCardId);

	const objCard = dictionaryObjects?.find(item => {
		return item.idDic === cardId;
	});

	function handlerAddWord() {
		setAddIsOpen(true);
	}

	function handlerDeleteDic() {
		if (objCard) {
			dispatch(fetchDeleteDicItem(objCard));
		}
	}

	const navigate = useNavigate();

	useEffect(() => {
		if (!objCard) {
			navigate("dictionary_react_rtk");
		}
	});

	function calcNumItems() {
		if (
			objCard?.itemsDic.length === 1 &&
			!Boolean(objCard?.itemsDic[0].itemId)
		) {
			return 0;
		}
		return objCard?.itemsDic.length;
	}

	const numItems = calcNumItems();

	return (
		<div id="editPage" className={module.root}>
			<div className={module.oneDiv}></div>
			<div className={module.twoDiv}>
				<AddWordItem
					dataObj={objCard}
					addIsOpen={addIsOpen}
					setAddIsOpen={setAddIsOpen}
				></AddWordItem>
				<p>
					Редактирование словарика: {objCard?.nameDic}
					<span style={{ marginLeft: "20px" }}>
						Сейчас в нем <span style={{fontWeight:'bold'}}>{numItems}/5 </span> фраз
					</span>
				</p>

				<div className={module.headerTable}>
					<div>Русский</div>
					<div>Испанский</div>
					<div>Английский</div>
					<div></div>
				</div>

				<div>
					{Boolean(objCard?.itemsDic[0]?.itemId) ? (
						objCard?.itemsDic.map(item => (
							<WordItem key={item.itemId} obj={objCard} item={item} />
						))
					) : (
						<p>{"Пустой словарик, добавьте первое слово :)"}</p>
					)}
				</div>

				<button
					onClick={handlerAddWord}
					type="button"
					className="btn btn-success"
				>
					Добавить слово
				</button>

				<Link to="/dictionary_react_rtk">
					<button
						onClick={handlerDeleteDic}
						type="button"
						className="btn btn-outline-danger"
					>
						Удалить словарик
					</button>
				</Link>
			</div>
			<div className={module.treeDiv}></div>
		</div>
	);
};
