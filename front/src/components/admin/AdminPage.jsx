import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRoom, deleteRoom, updateRoom } from '../../store/slices/roomsSlice';
import Loader from '../../components/loader/Loader';
import RoomForm from '../../components/admin/RoomForm';
import Modal from '../../components/modal/Modal';

export default function AdminPage() {
	const dispatch = useDispatch();
	const { data: rooms, loading } = useSelector((state) => state.rooms);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentRoom, setCurrentRoom] = useState(null);

	const formatPrice = (price) => {
		return new Intl.NumberFormat('ru-RU').format(price);
	};

	const handleEdit = (room) => {
		setCurrentRoom(room);
		setIsModalOpen(true);
	};

	const handleDelete = (roomId) => {
		if (window.confirm('Вы уверены, что хотите удалить этот номер?')) {
			dispatch(deleteRoom(roomId));
		}
	};

	const handleSubmit = (formData) => {
		if (currentRoom) {
			dispatch(
				updateRoom({
					id: currentRoom.id,
					updates: formData,
				}),
			);
		} else {
			const newRoom = {
				id: Date.now(),
				...formData,
				price: Number(formData.price),
			};
			dispatch(addRoom(newRoom));
		}
		setIsModalOpen(false);
		setCurrentRoom(null);
	};

	if (loading) return <Loader />;

	return (
		<div className="admin-page">
			<h1>Панель администратора</h1>

			<div className="admin-header">
				<h2>Управление номерами</h2>
				<Button
					onClick={() => {
						setCurrentRoom(null);
						setIsModalOpen(true);
					}}
				>
					+ Добавить номер
				</Button>
			</div>

			<table className="admin-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Название</th>
						<th>Тип</th>
						<th>Цена</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					{rooms.map((room) => (
						<tr key={room.id}>
							<td>{room.id}</td>
							<td>{room.name}</td>
							<td>
								{room.type === 'standard'
									? 'Стандарт'
									: room.type === 'comfort'
									? 'Комфорт'
									: 'Люкс'}
							</td>
							<td>{formatPrice(room.price)} ₽</td>
							<td className="actions">
								<Button
									variant="outline"
									size="small"
									onClick={() => handleEdit(room)}
								>
									Редактировать
								</Button>
								<Button
									variant="outline"
									size="small"
									onClick={() => handleDelete(room.id)}
								>
									Удалить
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<RoomForm
					room={currentRoom}
					onSubmit={handleSubmit}
					onCancel={() => {
						setIsModalOpen(false);
						setCurrentRoom(null);
					}}
				/>
			</Modal>
		</div>
	);
}
