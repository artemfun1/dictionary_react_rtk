import { DictionaryItem } from "../components/DictionaryItem";
import { selectDictionary } from "../redux/features/dictionsSlice";
import { decrement, fetchPosts, increment } from "../redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooksRedux";
import module from "../scss/homePage.module.scss";
import { useEffect } from 'react'

export const HomePage = () => {
	const dictionaries = useAppSelector(selectDictionary);

	// const count = useAppSelector(state => state.count);
	// const dispatch = useAppDispatch();

	// function clickPlus() {
	// 	dispatch(increment(10));
	// }


	// useEffect(()=>{
	// dispatch(fetchPosts())
	// },[dispatch])

	// function clickMinus() {
	// 	dispatch(decrement());
		
	// }









	return (
		<div className={module.container}>
			{/* <div>
				<button onClick={clickMinus}>-</button>
				<p>{count.value}</p>
				<button onClick={clickPlus}>+</button>
				<p>{JSON.stringify(count,null,2)}</p>
			</div> */}

			{!dictionaries.length && (
				<p style={{ marginTop: "70px" }}>
					<h4>Словарей нет, добавьте первый словарь</h4>
					<h6>В словаре добавьте слово или фразу на испанском и получите перевод на русский и английский</h6>
				</p>
			)}
			{dictionaries.map(item => (
				<DictionaryItem key={item.idDic} card={item} />
			))}
		</div>
	);
};
