import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../../store/slices/roomsSlice';
import RoomCard from '../../components/room/RoomCard';

export default function RoomsPage() {
	const dispatch = useDispatch();
	const { items: rooms, loading, error } = useSelector((state) => state.rooms);

	useEffect(() => {
		dispatch(fetchRooms());
	}, [dispatch]);

	if (loading) {
		return <p>Загрузка списка комнат...</p>;
	}

	if (error) {
		return <p style={{ color: 'red' }}>Ошибка: {error}</p>;
	}

	if (!rooms.length) {
		return <p>Нет доступных комнат.</p>;
	}

	return (
		<div className="rooms-page">
			<h1>Наши номера</h1>
			<div className="rooms-grid">
				{rooms.map((room) => (
					<RoomCard key={room._id} room={room} />
				))}
			</div>
		</div>
	);
}
