import { useEffect } from "react";
import { DictionaryItem } from "../components/DictionaryItem";
import {
	getDicItem,
	selectDictionary,
} from "../redux/features/dictionarySlice/dictionsSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooksRedux";
import module from "../scss/homePage.module.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../redux/FireBase/InitFireBase";
import { setTrueLoading } from '../redux/features/loadingSlice/loadingSlice'

export const HomePage = () => {
	const dispatch = useAppDispatch();
	const dictionaries = useAppSelector(selectDictionary);

	const count = useAppSelector(state => state.count.obj);

	useEffect(() => {
		dispatch(setTrueLoading())
		setTimeout(()=>{
				dispatch(getDicItem());
		
		},500)
	
	}, [dispatch]);

	useEffect(() => {
		// dispatch(getCount());
	}, []);

	function clickPlus() {
		// dispatch(incCount());
	}

	function clickMinus() {
		// dispatch(decCount());
	}

	async function getData() {

		const dataSnapshot = await getDocs(collection(db, "test_counter"));

		const dataList = dataSnapshot.docs.map(doc => doc.data());
	}

	return (
		<div className={module.container}>
			{/* TEST DIV FOR DEV */}
			{/* <div className="TEST DIV FOR DEV">
				<button onClick={clickPlus}>+</button>
				<p>{count.value}</p>
				<button onClick={clickMinus}>-</button>
				<p>{JSON.stringify(count, null, 2)}</p>

				<button onClick={getData}>dbFireBase</button>
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
