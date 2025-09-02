import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, deleteRoom, updateRoom } from '../../store/slices/roomsSlice';

export default function AdminPage() {
	const dispatch = useDispatch();
	const { data: rooms, status, error } = useSelector((state) => state.rooms);

	const [editingRoom, setEditingRoom] = useState(null);
	const [formData, setFormData] = useState({ name: '', price: '', description: '' });

	useEffect(() => {
		dispatch(fetchRooms());
	}, [dispatch]);

	const handleDelete = (roomId) => {
		if (window.confirm('Удалить эту комнату?')) {
			dispatch(deleteRoom(roomId));
		}
	};

	const handleEdit = (room) => {
		setEditingRoom(room.id);
		setFormData({
			name: room.name,
			price: room.price,
			description: room.description,
		});
	};

	const handleUpdate = () => {
		if (!editingRoom) return;
		dispatch(updateRoom({ roomId: editingRoom, updatedData: formData }))
			.unwrap()
			.then(() => {
				setEditingRoom(null);
				setFormData({ name: '', price: '', description: '' });
			})
			.catch((err) => console.error('Ошибка обновления комнаты:', err));
	};

	if (status === 'loading') return <p>Загрузка...</p>;
	if (status === 'failed') return <p>Ошибка: {error}</p>;

	return (
		<div>
			<h1>Админ-панель — Управление комнатами</h1>

			<ul>
				{rooms.map((room) => (
					<li key={room.id}>
						{editingRoom === room.id ? (
							<div>
								<input
									type="text"
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									placeholder="Название"
								/>
								<input
									type="number"
									value={formData.price}
									onChange={(e) =>
										setFormData({
											...formData,
											price: e.target.value,
										})
									}
									placeholder="Цена"
								/>
								<textarea
									value={formData.description}
									onChange={(e) =>
										setFormData({
											...formData,
											description: e.target.value,
										})
									}
									placeholder="Описание"
								/>
								<button onClick={handleUpdate}>Сохранить</button>
								<button onClick={() => setEditingRoom(null)}>
									Отмена
								</button>
							</div>
						) : (
							<>
								<strong>{room.name}</strong> — {room.price}₽
								<br />
								{room.description}
								<br />
								<button onClick={() => handleEdit(room)}>
									Редактировать
								</button>
								<button onClick={() => handleDelete(room.id)}>
									Удалить
								</button>
							</>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
