import module from "./wordItem.module.scss";

import { FunctionComponent, useState } from "react";
import editSvg from "../../img/edit.svg";
import removeSvg from "../../img/remove.svg";

import {
	IDictionaryItem,
	IDictionaryState,
	fetchAddWordItem,
} from "../../redux/features/dictionarySlice/dictionsSlice";
import { useAppDispatch } from "../../redux/store/hooksRedux";
import { EditWord } from "../EditWord";

interface props {
	obj: IDictionaryState;
	item: IDictionaryItem;
}

export const WordItem: FunctionComponent<props> = ({ obj, item }) => {
	const [editIsOpen, setEditIsOpen] = useState(false);

	const [content, setContent] = useState("");

	const dispatch = useAppDispatch();
	function handlerClickEdit(e: string) {
		setEditIsOpen(true);
		setContent(e);
	}

	function handlerClickDelete() {
		const index = obj.itemsDic.findIndex(i => {
			return i.itemId === item.itemId;
		});

		const copyArr = [...obj.itemsDic];
		copyArr.splice(index, 1);

		const newObg: IDictionaryState = {
			...obj,
			itemsDic: [...copyArr],
		};

		dispatch(fetchAddWordItem(newObg));
	}

	return (
		<div className={module.root}>
			<EditWord
				obj={obj}
				item={item}
				editIsOpen={editIsOpen}
				setEditIsOpen={setEditIsOpen}
				content={content}
			></EditWord>
			<div className={module.table}>
				<div>
					<p>{item.rus}</p>
				</div>
				<div>
					<p>{item.isp}</p>
				</div>
				<div>
					<p>{item.eng}</p>
				</div>

				<div className={module.img}>
					<img
						onClick={() => handlerClickEdit(item.rus)}
						className={module.one}
						src={editSvg}
						alt="edit"
					/>

					<img
						onClick={handlerClickDelete}
						className={module.two}
						src={removeSvg}
						alt="edit"
					/>
				</div>
			</div>
		</div>
	);
};
