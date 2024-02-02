import { Link } from "react-router-dom";
import module from "./header.module.scss";

export const Header = () => {
	return (
		<div className={module.header}>
			<Link className={module.link} to="/">
				<div> <h1>Dictionary</h1></div>
			</Link>
		</div>
	);
};
