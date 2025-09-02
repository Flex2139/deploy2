import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../button/Button';

export default function Header() {
	const { currentUser, logout } = useAuth();

	return (
		<header className="site-header">
			<div className="container header-inner">
				<div className="brand">
					<Link to="/" className="brand__logo" aria-label="Жемчужина Байкала">
						<span style={{ fontSize: 18 }}>ЖБ</span>
					</Link>
					<div>
						<div className="brand__title">Жемчужина Байкала</div>
						<div className="small muted">Отдых у озера</div>
					</div>
				</div>

				<nav className="site-nav" aria-label="Главное меню">
					<Link to="/">Главная</Link>
					<Link to="/rooms">Номера</Link>
					<Link to="/services">Услуги</Link>
					<Link to="/gallery">Галерея</Link>
					<Link to="/reviews">Отзывы</Link>
				</nav>

				<div
					className="header-actions"
					style={{ display: 'flex', gap: 12, alignItems: 'center' }}
				>
					{currentUser ? (
						<>
							<Link
								to="/profile"
								className="btn-outline"
								aria-label="Мой профиль"
							>
								Мой профиль
							</Link>
							<Button
								onClick={logout}
								className="btn-logout"
								aria-label="Выйти из аккаунта"
							>
								Выйти
							</Button>
						</>
					) : (
						<div style={{ display: 'flex', gap: 10 }}>
							<Link to="/login" className="small">
								Войти
							</Link>
							<Link to="/register" className="small">
								Регистрация
							</Link>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
