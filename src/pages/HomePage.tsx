import { DictionaryItem } from "../components/DictionaryItem";
import { selectDictionary } from "../redux/dictionsSlice";
import { useAppSelector } from "../redux/store/hooksRedux";
import module from "../scss/homePage.module.scss";

export const HomePage = () => {
	const dictionaries = useAppSelector(selectDictionary);

	return (
		<div className={module.container}>
			{!dictionaries.length && (
				<p style={{ marginTop: "70px" }}>
					Словариков нет, добавьте первый словарик
				</p>
			)}
			{dictionaries.map((item, i) => (
				<DictionaryItem key={i} card={item} />
			))}
		</div>
	);
};
