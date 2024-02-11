import { Link } from "react-router-dom";
import module from "./menu.module.scss";
import { useState } from 'react'
import { useAppSelector } from '../../redux/store/hooksRedux'

export const Menu = ({ setIsOpen }: any) => {

	const isLoading = useAppSelector(state => state.loading.value)
	

	function handlerClick() {
		setIsOpen(true);
	}

	return (
		<aside className={module.root}>
			<Link to="dictionary_react_rtk">
				<button type="button" className="btn btn-primary buttons">
					Словари
				</button>
			</Link>

			<button onClick={handlerClick} type="button" className="btn btn-primary buttons">
				Добавить словарь
			</button>

			{isLoading &&<div >loading...</div>}
		</aside>
	);
};
