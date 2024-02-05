import { useEffect, useState } from "react";
import { WordItem } from "../components/WordItem";

import { useAppDispatch, useAppSelector } from "../redux/store/hooksRedux";

import { Link, useNavigate } from "react-router-dom";
import { AddWordItem } from "../components/AddWordItem";
import { deleteDictionary, selectDictionary } from "../redux/features/dictionsSlice";
import { selectCardId } from "../redux/features/cardIdSlice";
import module from "../scss/editPage.module.scss";

export const EditPage = () => {
	const [addIsOpen, setAddIsOpen] = useState(false);

	const dictionaryObjects = useAppSelector(selectDictionary);

	const dispatch = useAppDispatch();

	const cardId = useAppSelector(selectCardId);

	const objCard = dictionaryObjects?.filter(item => {
		return item.idDic === cardId;
	});

	// const arr = objCard[0]?.itemsDic.map(item => (
	// 	<WordItem key={item.itemId} item={item} />
	// ));

	function handlerAddWord() {
		setAddIsOpen(true);
	}

	function handlerDeleteDic() {
		dispatch(deleteDictionary(cardId));
	}

	const navigate = useNavigate();

	useEffect(() => {
		if (!objCard[0]?.itemsDic) {
			navigate("/");
		}
	});

	function calcNumItems() {
		if (
			objCard[0]?.itemsDic.length === 1 &&
			!Boolean(objCard[0]?.itemsDic[0].itemId)
		) {
			return 0;
		}
		return objCard[0]?.itemsDic.length;
	}

	const numItems = calcNumItems();

	return (
		<div id="editPage" className={module.root}>
			<div className={module.oneDiv}></div>
			<div className={module.twoDiv}>
				<AddWordItem
					dataObj={objCard[0]}
					addIsOpen={addIsOpen}
					setAddIsOpen={setAddIsOpen}
				></AddWordItem>
				<p>
					Редактирование словарика: {objCard[0]?.nameDic}
					<span style={{ marginLeft: "20px" }}>
						Сейчас в нем {numItems}/20 слов
					</span>
				</p>

				<div className={module.headerTable}>
					<div>Испанский</div>
					<div>Русский</div>
					<div>Английский</div>
					<div></div>
				</div>

				<div>
					{Boolean(objCard[0]?.itemsDic[0]?.itemId) ? (
						objCard[0]?.itemsDic.map(item => (
							<WordItem key={item.itemId} obj={objCard[0]} item={item} />
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

				<Link to="/">
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
