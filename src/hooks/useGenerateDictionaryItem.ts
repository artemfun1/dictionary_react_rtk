import { IDictionaryState } from "../redux/dictionsSlice";

export const useGenerateDictionaryItem: (
	a: string,
	b: string
) => IDictionaryState = (imgUrl, name) => {
	return {
		idDic: Date.now().toString(),
		imgDic: imgUrl,
		nameDic: name,
		numItemsInDic: 0,
		itemsDic: [{ isp: "", rus: "", eng: "", itemId: "" }],
	};
};
