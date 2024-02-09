import { useEffect, useState } from "react";
import { DictionaryItem } from "../components/DictionaryItem";
import {
	useAddCountObjMutation,
	useDeleteCountObjMutation,
	useGetCountQuery,
} from "../redux/features/counterSlice/countApi";
import {
	decrementFetchCount,
	incrementFetchCount,
} from "../redux/features/counterSlice/counterSlice";
import { fetchGetDictionaryItems, selectDictionary } from "../redux/features/dictionarySlice/dictionsSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooksRedux";
import module from "../scss/homePage.module.scss";
import { getFetchCount } from '../redux/features/counterSlice/ServerSlice'

export const HomePage = () => {
	const dispatch = useAppDispatch();

	const [counts, setCounts] = useState("");
	const { data = [] } = useGetCountQuery(counts);
	const [addCountObj, {}] = useAddCountObjMutation();
	const [deleteObj] = useDeleteCountObjMutation();

	async function handleAddCountObj() {
		await addCountObj({
			status: "ololo",
			error: true,
			value: 100500,
		}).unwrap();
	}

	async function handleDeleteCountObj(id:any) {
		await deleteObj(id).unwrap()
	}

	const dictionaries = useAppSelector(selectDictionary);

	const count = useAppSelector(state => state.count.obj);

	useEffect(() => {
		dispatch(fetchGetDictionaryItems());
	}, [dispatch]);
	useEffect(() => {
		dispatch(getFetchCount());
	}, [dispatch]);

	function clickPlus() {
		dispatch(incrementFetchCount());
	}

	function clickMinus() {
		dispatch(decrementFetchCount());
	}

	return (
		<div className={module.container}>
			{/* TEST DIV FOR DEV */}
			{/* <div className='TEST DIV FOR DEV'>
				<button onClick={() => setCounts("1")}>click 1</button>
				<button onClick={() => setCounts("2")}>click 2</button>
				<button onClick={() => setCounts("3")}>click 3</button>
				<button onClick={handleAddCountObj}>click add</button>
			
				{data.map((item: any, i: any) => (
					<p onClick={()=>handleDeleteCountObj(item.id)} key={i}>{item.id}</p>
				))}

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
