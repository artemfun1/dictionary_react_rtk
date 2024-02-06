import { useEffect } from "react";
import { DictionaryItem } from "../components/DictionaryItem";
import {
	fetchGetDictionaryItems,
	selectDictionary,
} from "../redux/features/dictionsSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooksRedux";
import module from "../scss/homePage.module.scss";

export const HomePage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchGetDictionaryItems());
	}, [dispatch]);

	const dictionaries = useAppSelector(selectDictionary);

	// const count = useAppSelector(state => state.count);
	// const dispatch = useAppDispatch();

	// function clickPlus() {
	// 	dispatch(increment(10));
	// }
	// useEffect(()=>{
	// dispatch(getFetchCount())
	// },[dispatch])

	// function clickMinus() {
	// 	dispatch(decrement());
	// 	dispatch(getFetchCount())
	// }

	return (
		<div className={module.container}>
			{/* <div>
				<button onClick={clickMinus}>-</button>
				<p>{count.value}</p>
				<button onClick={clickPlus}>+</button>
				<p>{JSON.stringify(count,null,2)}</p>
			</div> */}

			{!dictionaries.arrayDictionaries.length && (
				<div style={{ marginTop: "70px" }}>
					<h4>Словарей нет, добавьте первый словарь</h4>
					<h6>
						В словаре добавьте слово или фразу на русском и получите перевод на
						испанский и английский
					</h6>
				</div>
			)}
			{dictionaries.arrayDictionaries.map(item => (
				<DictionaryItem key={item.idDic} card={item} />
			))}
		</div>
	);
};
