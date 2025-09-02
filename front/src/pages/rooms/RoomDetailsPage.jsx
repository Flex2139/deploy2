import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from '../../hooks/use-api';
import BookingForm from '../../components/booking-form/BookingForm';

export default function RoomDetailsPage() {
	const { id } = useParams();
	const [room, setRoom] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showBooking, setShowBooking] = useState(false);

	useEffect(() => {
		if (!id) {
			setError('ID комнаты не указан');
			setLoading(false);
			return;
		}

		const loadRoom = async () => {
			try {
				const data = await apiRequest(`/api/rooms/${id}`);
				setRoom(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		loadRoom();
	}, [id]);

	if (loading) return <p>Загрузка информации о номере...</p>;
	if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;
	if (!room) return <p>Номер не найден.</p>;

	return (
		<div className="room-details">
			<h1>{room.title || room.name}</h1>
			{room.images?.length > 0 && (
				<img
					src={room.images[0]}
					alt={room.title || room.name}
					style={{ maxWidth: '100%', borderRadius: '8px' }}
				/>
			)}
			<p>{room.description}</p>
			<p>
				<strong>Цена:</strong> {room.price} ₽
			</p>
			<p>
				<strong>Удобства:</strong>{' '}
				{room.amenities?.length ? room.amenities.join(', ') : '—'}
			</p>

			<button
				onClick={() => setShowBooking(true)}
				style={{
					padding: '10px 20px',
					marginTop: '15px',
					background: '#00a884',
					color: '#fff',
					border: 'none',
					borderRadius: '5px',
					cursor: 'pointer',
				}}
			>
				Забронировать
			</button>

			{showBooking && (
				<div style={{ marginTop: '20px' }}>
					<BookingForm
						roomId={room._id}
						onClose={() => setShowBooking(false)}
					/>
				</div>
			)}
		</div>
	);
}
