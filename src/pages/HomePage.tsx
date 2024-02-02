import { DictionaryItem } from "../components/DictionaryItem";
import module from "../scss/homePage.module.scss";

export const Home = () => {
	const arr = [1, 1, 1, 1, 1];
	return (
		<div className={module.container}>
			{arr.map((_,i) => (
				<DictionaryItem key={i}/>
			))}
		</div>
	);
};
