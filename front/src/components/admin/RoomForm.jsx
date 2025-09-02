import { useState, useEffect } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';

export default function RoomForm({ room, onSubmit, onCancel }) {
	const [formData, setFormData] = useState({
		name: '',
		type: 'standard',
		price: '',
		description: '',
		image: '',
	});

	useEffect(() => {
		if (room) {
			setFormData({
				name: room.name || '',
				type: room.type || 'standard',
				price: room.price || '',
				description: room.description || '',
				image: room.image || '',
			});
		}
	}, [room]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="room-form">
			<h3>{room ? 'Редактировать номер' : 'Добавить новый номер'}</h3>

			<Input
				label="Название номера"
				name="name"
				value={formData.name}
				onChange={handleChange}
				required
			/>

			<div className="form-group">
				<label>Тип номера:</label>
				<select
					name="type"
					value={formData.type}
					onChange={handleChange}
					className="form-select"
				>
					<option value="standard">Стандарт</option>
					<option value="comfort">Комфорт</option>
					<option value="luxury">Люкс</option>
				</select>
			</div>

			<Input
				label="Цена за ночь (руб)"
				name="price"
				type="number"
				value={formData.price}
				onChange={handleChange}
				required
			/>

			<div className="form-group">
				<label>Описание:</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					className="form-textarea"
					rows="3"
				/>
			</div>

			<Input
				label="URL изображения"
				name="image"
				value={formData.image}
				onChange={handleChange}
			/>

			<div className="form-actions">
				<Button type="submit">Сохранить</Button>
				<Button variant="outline" onClick={onCancel}>
					Отмена
				</Button>
			</div>
		</form>
	);
}
