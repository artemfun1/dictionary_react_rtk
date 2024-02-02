import { Link } from "react-router-dom";
import module from "./menu.module.scss";

export const Menu = () => {


	


	// function click(){
	
	// 	const dialog  =  document.getElementById('id') as HTMLDialogElement
				
	// 	dialog?.showModal()
	// }

	return (
		<aside className={module.root}>
			<Link to="/">
      <button type='button' className='btn btn-primary'>
				Словари
			</button>
       </Link>

			<button  type='button' className='btn btn-primary'>
				Добавить словарь
			</button>
		</aside>
	);
};
