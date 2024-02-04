import React, { FunctionComponent, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
	IDictionaryItem,
	IDictionaryState,
	createDictionary,
} from "../../redux/dictionsSlice";
import { useAppDispatch } from "../../redux/store/hooksRedux";
import module from "./addWordItem.module.scss";

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
   
    if((e.target.value).match(/\d/)){
      alert("можно вводить только буквы латинского алфавита без цифр ")
      setNewWord("");
      return
    }
		setNewWord(e.target.value);
	}

	function handlerSubmitForm(e: any) {

    if(dataObj.itemsDic.length===20){
      alert("Максимум 20 фраз/слов в одном словарике")
      setNewWord("");
      setAddIsOpen(false);
      return
    }
		if (dataObj.itemsDic.length === 1 && !Boolean(dataObj.itemsDic[0].itemId)) {
			const newWords: IDictionaryItem = {
				isp: newWord,
				rus: "перевод рус",
				eng: "перевод англ",
				itemId: Date.now().toString(),
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
				itemId: Date.now().toString(),
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
						name="name"
						onChange={e => handlerInput(e)}
						value={newWord}
						type="text"
						placeholder="Новое слово или фраза"
						required
					/>

					<button type="submit">Создать</button>

					<button type="button" onClick={handlerCancelClick}>
						Отмена
					</button>
				</label>
			</form>
		</dialog>
	);

	return createPortal(addWord, document.getElementById("root") as HTMLElement);
};
