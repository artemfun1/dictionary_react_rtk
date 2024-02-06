import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";
import {
	IDictionaryItem,
	IDictionaryState,
	fetchAddWordItem,
} from "../../redux/features/dictionsSlice";
import { useAppDispatch } from "../../redux/store/hooksRedux";
import module from "./editWord.module.scss";

interface IProps {
	editIsOpen: boolean;
	setEditIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	obj: IDictionaryState;
	item: IDictionaryItem;
	content: string;
}

export const EditWord: FunctionComponent<IProps> = ({
	editIsOpen,
	setEditIsOpen,
	obj,
	item,
	content,
}) => {
	const [newWord, setNewWord] = useState("");

	useEffect(() => {
		setNewWord(content);
	}, [content]);

	const dispatch = useAppDispatch();

	function handlerInput(e: any) {
		if (e.target.value.match(/\d/)) {
			alert("можно вводить только буквы, без цифр ");
			setNewWord("");
			return;
		}
		setNewWord(e.target.value);
	}

	function handlerSubmitForm() {
		const editWordsObg: IDictionaryItem = {
			rus: newWord,
			isp: item.isp,
			eng: item.eng,
			itemId: item.itemId,
		};

		const index = obj.itemsDic.findIndex(item => {
			return item.itemId === editWordsObg.itemId;
		});

		const copyArr = [...obj.itemsDic];
		copyArr.splice(index, 1, editWordsObg);

		const newObg: IDictionaryState = {
			...obj,
			itemsDic: [...copyArr],
		};

		dispatch(fetchAddWordItem(newObg));

		setNewWord(content);
		setEditIsOpen(false);
	}

	function handlerCancelClick() {
		setNewWord(content);
		setEditIsOpen(false);
	}

	const dialogAdd = useRef<HTMLDialogElement>(null);

	if (editIsOpen) {
		dialogAdd.current?.showModal();
	} else {
		dialogAdd.current?.close();
	}

	const addWord = (
		<dialog ref={dialogAdd} className={module.root}>
			<form onSubmit={handlerSubmitForm} method="dialog" action="">
				<label htmlFor="word">
					<p>Отредактируйте слово или фразу на испанском</p>
					<input
						autoComplete="off"
						name="name"
						onChange={e => handlerInput(e)}
						value={newWord}
						type="text"
						// placeholder="Новое слово или фраза"
						required
					/>

					<button type="submit" className="btn btn-outline-success ">
						Отредактировать
					</button>

					<button
						type="button"
						className="btn btn-outline-warning"
						onClick={handlerCancelClick}
					>
						Отмена
					</button>
				</label>
			</form>
		</dialog>
	);

	return createPortal(addWord, document.getElementById("root") as HTMLElement);
};
