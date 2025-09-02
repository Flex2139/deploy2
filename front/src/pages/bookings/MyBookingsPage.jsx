import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../store/slices/bookingsSlice';
import { useAuth } from '../../context/AuthContext';

export default function MyBookings() {
	const dispatch = useDispatch();
	const { currentUser } = useAuth();

	const { items: bookings, status, error } = useSelector((state) => state.bookings);

	useEffect(() => {
		if (currentUser) {
			dispatch(fetchBookings());
		}
	}, [dispatch, currentUser]);

	if (!currentUser) {
		return <p>Пожалуйста, войдите в аккаунт, чтобы просмотреть бронирования.</p>;
	}
	if (status === 'loading') return <p>Загрузка бронирований...</p>;
	if (status === 'failed') return <p style={{ color: 'red' }}>Ошибка: {error}</p>;
	if (!bookings.length) return <p>У вас пока нет бронирований.</p>;

	return (
		<div>
			<h2>Мои бронирования</h2>
			<ul>
				{bookings.map((b) => (
					<li key={b._id} style={{ marginBottom: 12 }}>
						<strong>Номер:</strong> {b.room?.title || b.room} <br />
						<strong>Заезд:</strong> {new Date(b.checkIn).toLocaleDateString()}{' '}
						<br />
						<strong>Выезд:</strong>{' '}
						{new Date(b.checkOut).toLocaleDateString()} <br />
						<strong>Гостей:</strong> {b.guests} <br />
						<strong>Статус:</strong> {b.status}
					</li>
				))}
			</ul>
		</div>
	);
}
