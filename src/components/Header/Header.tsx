import { Link } from "react-router-dom";
import loshadka from "../../img/loshadka.png";
import { deleteAllDicItem } from "../../redux/features/dictionarySlice/dictionsSlice";
import { useAppDispatch } from "../../redux/store/hooksRedux";
import module from "./header.module.scss";

export const Header = () => {
	const dispatch = useAppDispatch();

	function handlerClick() {
		dispatch(deleteAllDicItem());
	}

	return (
		<div className={module.header}>
			<Link className={module.link} to="/dictionary_react_rtk_saga_firebase-firestore">
				<div>
					<h1>Dictionary</h1>
				</div>
			</Link>
			<img onClick={handlerClick} src={loshadka} alt="лошадка" />
			<p>нажми на лошадку, чтоб удалить все словари</p>
		</div>
	);
};
