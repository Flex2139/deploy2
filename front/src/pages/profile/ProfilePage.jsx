import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
	const { currentUser } = useAuth();

	if (!currentUser) {
		return (
			<div className="mt-6">
				<h1>Профиль</h1>
				<p className="muted">Пожалуйста, войдите, чтобы увидеть профиль.</p>
				<Link to="/login" className="btn" style={{ marginTop: 12 }}>
					Войти
				</Link>
			</div>
		);
	}

	return (
		<div className="mt-6">
			<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
				<div>
					<h1 style={{ margin: 0 }}>{currentUser.name || 'Пользователь'}</h1>
					<div className="small muted" style={{ marginTop: 6 }}>
						{currentUser.email}
					</div>
				</div>

				<div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
					<Link
						to="/my-bookings"
						className="btn-outline"
						aria-label="Мои бронирования"
					>
						Мои бронирования
					</Link>
				</div>
			</div>

			<section style={{ marginTop: 20 }}>
				<h2>Информация</h2>
				<p className="muted">Страница в стадии разработки...</p>
			</section>
		</div>
	);
}
