import { useEffect,  } from "react";
import { DictionaryItem } from "../components/DictionaryItem";


import { getDicItem, selectDictionary } from "../redux/features/dictionarySlice/dictionsSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooksRedux";
import module from "../scss/homePage.module.scss";
import { decCount, getCount, incCount } from '../redux/features/counterSlice/counterSlice'

export const HomePage = () => {
	const dispatch = useAppDispatch();
	const dictionaries = useAppSelector(selectDictionary);


	const count = useAppSelector(state => state.count.obj);

	useEffect(() => {
		dispatch(getDicItem());
	}, [dispatch]);
	useEffect(() => {
		// dispatch(getCount());
	}, []);

	function clickPlus() {
		dispatch(incCount());
	}

	function clickMinus() {
		dispatch(decCount());
	}

	return (
		<div className={module.container}>
			{/* TEST DIV FOR DEV */}
			{/* <div className='TEST DIV FOR DEV'>
				<button onClick={clickPlus}>+</button>
				<p>{count.value}</p>
				<button onClick={clickMinus}>-</button>
				<p>{JSON.stringify(count, null, 2)}</p>
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
