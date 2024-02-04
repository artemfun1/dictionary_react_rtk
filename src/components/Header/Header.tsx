import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import loshadka from "../../img/loshadka.png";
import { selectCardId } from "../../redux/cardIdSlice";
import { selectDictionary } from "../../redux/dictionsSlice";
import module from "./header.module.scss";

export const Header = () => {
	const dic = useSelector(selectDictionary);

	const cardId = useSelector(selectCardId);

	function click() {
		console.log(dic);
		// console.log(cardId);
	}

	return (
		<div className={module.header}>
			<Link className={module.link} to="/">
				<div>
					<h1>Dictionary</h1>
				</div>
			</Link>
			<img onClick={click} src={loshadka} alt="лошадка" />
		</div>
	);
};
