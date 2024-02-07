import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import React, { FunctionComponent, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
	IDictionaryItem,
	IDictionaryState,
	fetchAddWordItem,
} from "../../redux/features/dictionarySlice/dictionsSlice";
import { useAppDispatch } from "../../redux/store/hooksRedux";
import module from "./addWordItem.module.scss";

interface props {
	addIsOpen: boolean;
	setAddIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	dataObj: IDictionaryState | undefined;
}

export const AddWordItem: FunctionComponent<props> = ({
	addIsOpen,
	setAddIsOpen,
	dataObj,
}) => {
	const [newWord, setNewWord] = useState("");

	const dispatch = useAppDispatch();

	async function createAndTranslate() {
		const LANG = {
			RUS: "ru",
			ENG: "en",
			ISP: "es",
		};
		const ispUrl =
			"https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
			LANG.RUS +
			"&tl=" +
			LANG.ISP +
			"&dt=t&q=" +
			encodeURI(newWord);

		const engUrl =
			"https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
			LANG.RUS +
			"&tl=" +
			LANG.ENG +
			"&dt=t&q=" +
			encodeURI(newWord);

		const getIspWord = await axios.get(ispUrl);
		const ispWord = getIspWord.data[0][0][0];

		const getEngWord = await axios.get(engUrl);
		const engWord = getEngWord.data[0][0][0];

		const newObj: IDictionaryItem = {
			rus: newWord,
			isp: ispWord,
			eng: engWord,
			itemId: nanoid(),
		};
		console.log(newObj);

		return newObj;
	}

	function handlerInput(e: any) {
		if (e.target.value.match(/\d/)) {
			alert("можно вводить только буквы без цифр ");
			setNewWord("");
			return;
		}
		setNewWord(e.target.value);
	}

	async function handlerSubmitForm(e: any) {
		if (dataObj?.itemsDic.length === 5) {
			alert("Максимум 5 фраз/слов в одном словарике");
			setNewWord("");
			setAddIsOpen(false);
			return;
		}

		const newWords: IDictionaryItem = await createAndTranslate();

		if (
			dataObj?.itemsDic.length === 1 &&
			!Boolean(dataObj.itemsDic[0].itemId)
		) {
			const newObg: IDictionaryState = {
				...dataObj,
				itemsDic: [newWords],
			};
			dispatch(fetchAddWordItem(newObg));
		} else if (dataObj?.itemsDic) {
			const newObg: IDictionaryState = {
				...dataObj,
				itemsDic: [...dataObj.itemsDic, newWords],
			};

			dispatch(fetchAddWordItem(newObg));
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
					<p>Введите новое слово или фразу на русском языке</p>
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
