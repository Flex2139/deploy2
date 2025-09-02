import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
	return (
		<div>
			<div className="home-bg" aria-hidden="true" />

			<section className="hero">
				<div className="hero-card">
					<h1>Отдых на берегу Байкала</h1>
					<p className="lead muted">
						Добро пожаловать в "Жемчужину Байкала" — уютный отель у озера с
						комфортными номерами и активностями на природе.
					</p>

					<div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
						<Link to="/rooms" className="btn">
							Забронировать
						</Link>
					</div>
				</div>
			</section>

			<section className="mt-6">
				<h2>Наши преимущества</h2>
				<div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
					<div className="card" style={{ padding: 16, flex: 1 }}>
						<h3>Природа</h3>
						<p className="muted">
							Вдали от города — свежий воздух и виды на Байкал.
						</p>
					</div>
					<div className="card" style={{ padding: 16, flex: 1 }}>
						<h3>Комфорт</h3>
						<p className="muted">Удобные номера и домашняя кухня.</p>
					</div>
					<div className="card" style={{ padding: 16, flex: 1 }}>
						<h3>Сервис</h3>
						<p className="muted">
							Дружелюбная команда и трансфер по запросу.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
