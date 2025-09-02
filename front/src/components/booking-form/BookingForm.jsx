import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBooking } from '../../store/slices/bookingsSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function BookingForm({ roomId, onClose }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser } = useAuth();

	const [checkIn, setCheckIn] = useState('');
	const [checkOut, setCheckOut] = useState('');
	const [guests, setGuests] = useState(1);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);

	if (!currentUser) {
		return (
			<div className="booking-form">
				<p className="muted">
					Чтобы забронировать номер, пожалуйста <Link to="/login">войдите</Link>
					.
				</p>
			</div>
		);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		if (!checkIn || !checkOut) {
			setError('Заполните даты');
			return;
		}
		if (new Date(checkIn) > new Date(checkOut)) {
			setError('Дата заезда должна быть раньше даты выезда');
			return;
		}

		const payload = {
			room: roomId,
			checkIn,
			checkOut,
			guests,
		};

		try {
			setSubmitting(true);
			await dispatch(createBooking(payload)).unwrap();
			if (typeof onClose === 'function') onClose();
			navigate('/my-bookings');
		} catch (err) {
			setError(err || 'Ошибка при создании бронирования');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="booking-form">
			<div className="form-row">
				<div className="col">
					<label className="form-label">Заезд</label>
					<input
						className="form-field"
						type="date"
						value={checkIn}
						onChange={(e) => setCheckIn(e.target.value)}
						required
					/>
				</div>
				<div className="col">
					<label className="form-label">Выезд</label>
					<input
						className="form-field"
						type="date"
						value={checkOut}
						onChange={(e) => setCheckOut(e.target.value)}
						required
					/>
				</div>
			</div>

			<div style={{ marginTop: 10 }}>
				<label className="form-label">Гостей</label>
				<input
					className="form-field"
					type="number"
					min="1"
					value={guests}
					onChange={(e) => setGuests(Number(e.target.value))}
				/>
			</div>

			{error && <p style={{ color: 'red' }}>Ошибка: {String(error)}</p>}

			<div style={{ marginTop: 14 }}>
				<button type="submit" className="btn" disabled={submitting}>
					{submitting ? 'Сохраняем...' : 'Забронировать'}
				</button>
				{onClose && (
					<button
						type="button"
						className="btn-outline"
						onClick={onClose}
						style={{ marginLeft: 8 }}
					>
						Отмена
					</button>
				)}
			</div>
		</form>
	);
}
