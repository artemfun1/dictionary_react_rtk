import { all, takeEvery } from "redux-saga/effects";
import { incrementCountSaga } from "../features/counterSlice/counterSlice";
import {
	ADD_WORD_DICTIONARY_ITEM,
	CREATE_DICTIONARY_ITEM,
	DELETE_ALL_DICTIONARY_ITEM,
	DELETE_DICTIONARY_ITEM,
	SET_DICTIONARY_ITEM,
	sagaAddWordItem,
	sagaCreateDictionaryItem,
	sagaDeleteAll,
	sagaDeleteDicItem,
	sagaGetDictionaryItems,
} from "../features/dictionarySlice/dictionsSlice";

export function* sagasDictionary() {
	yield all([
		takeEvery(SET_DICTIONARY_ITEM, sagaGetDictionaryItems),
		takeEvery(CREATE_DICTIONARY_ITEM, sagaCreateDictionaryItem),
		takeEvery(ADD_WORD_DICTIONARY_ITEM, sagaAddWordItem),
		takeEvery(DELETE_DICTIONARY_ITEM, sagaDeleteDicItem),
		takeEvery(DELETE_ALL_DICTIONARY_ITEM, sagaDeleteAll),
	]);
}
