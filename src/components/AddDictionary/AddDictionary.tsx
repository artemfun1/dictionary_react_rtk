import module from "./addDictionary.module.scss";

export const AddDictionary = () => {
	return (
		<>
			<dialog id="id" className={module.dialog}>
				<form action="" method="dialog">
					<p>Создание нового словаря</p>
					<label htmlFor="name">Введите название словаря:</label>
					<input
						placeholder="Название"
						type="text"
						name="name"
						id="name"
						required
					/>

					<label htmlFor="img">Вставьте ссылку на картинку:</label>
					<input
						placeholder="Ссылка на картинку"
						type="text"
						name="name"
						id="img"
						required
					/>

					<div>
						<button type="button" className="btn btn-outline-warning">
							Отмена
						</button>
						<button type="button" className="btn btn-outline-success">
							Создать
						</button>
					</div>
				</form>
			</dialog>
		</>
	);
};
