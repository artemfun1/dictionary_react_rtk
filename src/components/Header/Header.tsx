import { Link } from "react-router-dom";
import module from "./header.module.scss";
import loshadka from '../../img/loshadka.png'
import { useSelector } from 'react-redux'
import { selectDictionary } from '../../redux/dictionsSlice'


export const Header = () => {

	const some = useSelector(selectDictionary)

	function click(){
		console.log(some)
	}
	

	return (
		<div className={module.header}>
			<Link className={module.link} to="/">
				<div> <h1>Dictionary</h1></div>
			</Link>
			<img onClick={click} src={loshadka} alt="лошадка" />
		</div>
	);
};
