import React from 'react';
import { Link } from 'react-router-dom';

export default function RoomCard({ room }) {
	const id = room.id || room._id || (room.raw && room.raw._id);
	const image =
		room.image || (room.images && room.images[0]) || '/images/placeholder.svg';
	const name = room.name || room.title || 'Номер';
	const short =
		room.short || (room.description ? String(room.description).slice(0, 120) : '');

	return (
		<article className="room-card card">
			<div className="media">
				<img
					src={image}
					alt={`Фото номера ${name}`}
					loading="lazy"
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						display: 'block',
					}}
				/>
			</div>

			<div className="content" style={{ padding: 16 }}>
				<h3 style={{ margin: 0 }}>{name}</h3>
				<p className="muted" style={{ marginTop: 8 }}>
					{short}
				</p>

				<div
					className="meta"
					style={{
						marginTop: 12,
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div style={{ fontWeight: 700 }}>{room.price} ₽</div>
					<Link
						to={`/rooms/${id}`}
						className="btn-outline"
						style={{ textDecoration: 'none' }}
					>
						Подробнее
					</Link>
				</div>
			</div>
		</article>
	);
}
