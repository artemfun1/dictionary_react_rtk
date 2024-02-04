import React, { FunctionComponent, useRef, useState } from "react";

import { createPortal } from "react-dom";
import {
	IDictionaryItem,
	IDictionaryState,
	createDictionary,
} from "../../redux/dictionsSlice";
import { useAppDispatch } from "../../redux/store/hooksRedux";
import module from "./editWord.module.scss";

interface IProps {
	editIsOpen: boolean;
	setEditIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	obj: IDictionaryState;
	item: IDictionaryItem;
}

export const EditWord: FunctionComponent<IProps> = ({
	editIsOpen,
	setEditIsOpen,
	obj,
	item,
}) => {
	const [newWord, setNewWord] = useState("");

	// console.log(obj)
	// console.log(item)

	const dispatch = useAppDispatch();

	function handlerInput(e: any) {
		if (e.target.value.match(/\d/)) {
			alert("можно вводить только буквы латинского алфавита без цифр ");
			setNewWord("");
			return;
		}
		setNewWord(e.target.value);
	}

	function handlerSubmitForm() {
		const editWordsObg: IDictionaryItem = {
			isp: newWord,
			rus: item.rus,
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

		dispatch(createDictionary(newObg));

		setNewWord("");
		setEditIsOpen(false);
	}

	function handlerCancelClick() {
		setNewWord("");
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
						name="name"
						onChange={e => handlerInput(e)}
						value={newWord}
						type="text"
						placeholder="Новое слово или фраза"
						required
					/>

					<button type="submit">Отредактировать</button>

					<button type="button" onClick={handlerCancelClick}>
						Отмена
					</button>
				</label>
			</form>
		</dialog>
	);

	return createPortal(addWord, document.getElementById("root") as HTMLElement);
};
