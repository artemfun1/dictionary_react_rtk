import module from "./wordItem.module.scss";

import editSvg from '../../img/edit.svg'
import removeSvg from '../../img/remove.svg'

export const WordItem = () => {
	return (
		<div className={module.root}>
			<div className={module.table}>
				<div>
					<p>исп</p>
				</div>
				<div>
					<p>рус</p>
				</div>
				<div>
					<p>англ</p>
				</div>



				<div className={module.img}>
					
					
				<img className={module.one} src={editSvg} alt="edit" />


				<img className={module.two} src={removeSvg} alt="edit" />

			
				</div>

			</div>
		</div>
	);
};
