import React, { FunctionComponent, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
	IDictionaryItem,
	IDictionaryState,
	createDictionary,
} from "../../redux/features/dictionsSlice";
import { useAppDispatch } from "../../redux/store/hooksRedux";
import module from "./addWordItem.module.scss";
import { nanoid } from '@reduxjs/toolkit'

interface props {
	addIsOpen: boolean;
	setAddIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	dataObj: IDictionaryState;
}

export const AddWordItem: FunctionComponent<props> = ({
	addIsOpen,
	setAddIsOpen,
	dataObj,
}) => {
	const [newWord, setNewWord] = useState("");

	const dispatch = useAppDispatch();

	function handlerInput(e: any) {
		if (e.target.value.match(/\d/)) {
			alert("можно вводить только буквы латинского алфавита без цифр ");
			setNewWord("");
			return;
		}
		setNewWord(e.target.value);
	}

	function handlerSubmitForm(e: any) {
		if (dataObj.itemsDic.length === 20) {
			alert("Максимум 20 фраз/слов в одном словарике");
			setNewWord("");
			setAddIsOpen(false);
			return;
		}
		if (dataObj.itemsDic.length === 1 && !Boolean(dataObj.itemsDic[0].itemId)) {
			const newWords: IDictionaryItem = {
				isp: newWord,
				rus: "перевод рус",
				eng: "перевод англ",
				itemId: nanoid(),
			};

			const newObg: IDictionaryState = {
				...dataObj,
				itemsDic: [newWords],
			};
			dispatch(createDictionary(newObg));
		} else {
			const newWords: IDictionaryItem = {
				isp: newWord,
				rus: "перевод рус",
				eng: "перевод англ",
				itemId: nanoid(),
			};

			const newObg: IDictionaryState = {
				...dataObj,
				itemsDic: [...dataObj.itemsDic, newWords],
			};

			dispatch(createDictionary(newObg));
		}

		setNewWord("");
		setAddIsOpen(false);
	}

	function handlerCancelClick() {
		setNewWord("");
		setAddIsOpen(false);
	}

	const dialogAdd = useRef<HTMLDialogElement>(null);

	if (addIsOpen) {
		dialogAdd.current?.showModal();
	} else {
		dialogAdd.current?.close();
	}

	const addWord = (
		<dialog ref={dialogAdd} className={module.root}>
			<form onSubmit={handlerSubmitForm} method="dialog" action="">
				<label htmlFor="word">
					<p>Введите новое слово или фразу на испанском</p>
					<input
						autoComplete="off"
						name="name"
						onChange={e => handlerInput(e)}
						value={newWord}
						type="text"
						placeholder="Новое слово или фраза"
						required
					/>
					<div>
						<button
							type="button"
							className="btn btn-outline-warning"
							onClick={handlerCancelClick}
						>
							Отмена
						</button>
						<button type="submit" className="btn btn-outline-success">
							Создать
						</button>
					</div>
				</label>
			</form>
		</dialog>
	);

	return createPortal(addWord, document.getElementById("root") as HTMLElement);
};
