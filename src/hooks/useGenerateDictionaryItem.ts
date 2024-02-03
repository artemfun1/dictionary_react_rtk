import { IDictionaryState } from "../redux/dictionsSlice";

export const useGenerateDictionaryItem: (
	a: string,
	b: string,
	c: string
) => IDictionaryState = (imgUrl, name, id) => {
	return {
		idDic: id,
		imgDic: imgUrl,
		nameDic: name,
		numItemsInDic: 0,
		itemsDic: [{ isp: "", rus: "", eng: "" }],
	};
};
