import { Link } from "react-router-dom";
import loshadka from "../../img/loshadka.png";
import module from "./header.module.scss";
import { useAppDispatch } from '../../redux/store/hooksRedux'
import { fetchDeleteAll } from '../../redux/features/dictionsSlice'

export const Header = () => {

	const dispatch = useAppDispatch()

	function handlerClick(){
		dispatch(fetchDeleteAll())
	}

	return (
		<div className={module.header}>
			<Link className={module.link} to="/dictionary_react_rtk">
				<div>
					<h1>Dictionary</h1>
				</div>
			</Link>
			<img onClick={handlerClick} src={loshadka} alt="лошадка" />
			<p>нажми на лошадку, чтоб удалить все словари</p>
		</div>
	);
};
