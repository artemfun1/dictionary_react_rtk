import { WordItem } from "../components/WordItem";

import module from "../scss/editPage.module.scss";

export const EditPage = () => {
	return (
		<div className={module.root}>
			<div className={module.oneDiv}></div>
			<div className={module.twoDiv}>
				<p>
					Редактирование словарика.
					<span>Сейчас в нем 10/20 слов</span>
				</p>

				<div className={module.headerTable}>
					<div>Испанский</div>
					<div>Русский</div>
					<div>Английский</div>
					<div></div>
				</div>

				<div>
					<WordItem />
					<WordItem />
					<WordItem />
					<WordItem />
					<WordItem />
					<WordItem />
					<WordItem />
					<WordItem />
					<WordItem />
					<WordItem />
					<WordItem />
					<WordItem />
					<WordItem />
					<WordItem />
					<WordItem />
				</div>

				<button type="button" className="btn btn-success">
					Добавить слово
				</button>

				<button type="button" className="btn btn-outline-danger">
					Удалить словарик
				</button>
			</div>
			<div className={module.treeDiv}></div>
		</div>
	);
};
