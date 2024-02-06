import { nanoid } from "@reduxjs/toolkit";
import { IDictionaryState } from "../redux/features/dictionsSlice";

export const useGenerateDictionaryItem: (
	a: string,
	b: string
) => IDictionaryState = (imgUrl, name) => {
	return {
		id: "",
		idDic: nanoid(),
		imgDic: imgUrl,
		nameDic: name,
		numItemsInDic: 0,
		itemsDic: [{ rus: "", isp: "", eng: "", itemId: "" }],
	};
};
