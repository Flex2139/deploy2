import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ReviewsPage = () => {
	const { currentUser } = useAuth();
	const [localUser, setLocalUser] = useState(null);

	const [reviews, setReviews] = useState([]);
	const [userReview, setUserReview] = useState(null);
	const [rating, setRating] = useState(5);
	const [text, setText] = useState('');

	useEffect(() => {
		const saved = JSON.parse(localStorage.getItem('reviews')) || [];
		setReviews(saved);

		const effectiveUser =
			currentUser || JSON.parse(localStorage.getItem('currentUser'));
		setLocalUser(effectiveUser || null);

		if (effectiveUser) {
			const rev = saved.find((r) => r.userId === effectiveUser.id);
			setUserReview(rev || null);
			if (rev) {
				setRating(rev.rating);
				setText(rev.text);
			} else {
				setRating(5);
				setText('');
			}
		} else {
			setUserReview(null);
			setRating(5);
			setText('');
		}
	}, [currentUser]);

	const saveReviews = (next) => {
		setReviews(next);
		try {
			localStorage.setItem('reviews', JSON.stringify(next));
		} catch (err) {
			console.warn('Failed to save reviews to localStorage', err);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!localUser) {
			alert('Для добавления отзыва необходимо авторизоваться');
			return;
		}
		if (!text.trim()) {
			alert('Текст отзыва не может быть пустым');
			return;
		}

		const newReview = {
			id: userReview ? userReview.id : Date.now(),
			userId: localUser.id,
			userName: localUser.name || localUser.email || 'Гость',
			rating: Number(rating),
			text: text.trim(),
			date: new Date().toISOString().split('T')[0],
		};

		let next;
		if (userReview) {
			next = reviews.map((r) => (r.id === userReview.id ? newReview : r));
		} else {
			next = [...reviews, newReview];
		}

		saveReviews(next);
		setUserReview(newReview);
	};

	const handleDelete = (reviewId) => {
		const r = reviews.find((x) => x.id === reviewId);
		if (!r) return;

		const effectiveUser = localUser;
		if (!effectiveUser) {
			alert('Только автор или администратор может удалить отзыв');
			return;
		}

		if (!(effectiveUser.isAdmin || effectiveUser.id === r.userId)) {
			alert('У вас нет прав для удаления этого отзыва');
			return;
		}

		if (!window.confirm('Вы уверены, что хотите удалить отзыв?')) return;

		const next = reviews.filter((x) => x.id !== reviewId);
		saveReviews(next);

		if (userReview && userReview.id === reviewId) {
			setUserReview(null);
			setText('');
			setRating(5);
		}
	};

	return (
		<div className="mt-6">
			<h1>Отзывы об отеле</h1>

			{localUser ? (
				<form onSubmit={handleSubmit} className="mt-6" style={{ maxWidth: 720 }}>
					<div className="hero-card" style={{ padding: 16 }}>
						<h2 style={{ marginTop: 0 }}>
							{userReview
								? 'Редактировать ваш отзыв'
								: 'Добавить ваш отзыв'}
						</h2>

						<div style={{ marginTop: 10 }}>
							<label className="form-label">Оценка</label>
							<select
								className="form-field"
								value={rating}
								onChange={(e) => setRating(Number(e.target.value))}
							>
								{[5, 4, 3, 2, 1].map((n) => (
									<option key={n} value={n}>
										{n} ★
									</option>
								))}
							</select>
						</div>

						<div style={{ marginTop: 12 }}>
							<label className="form-label">Текст отзыва</label>
							<textarea
								className="form-field"
								rows="4"
								value={text}
								onChange={(e) => setText(e.target.value)}
								required
							/>
						</div>

						<div style={{ marginTop: 12 }}>
							<button className="btn" type="submit">
								{userReview ? 'Обновить отзыв' : 'Добавить отзыв'}
							</button>
						</div>
					</div>
				</form>
			) : (
				<div className="mt-6 hero-card">
					<p className="muted">
						Чтобы оставить отзыв, необходимо авторизоваться
					</p>
					<Link
						to="/login"
						className="btn-outline"
						style={{ marginTop: 8, display: 'inline-block' }}
					>
						Войти в аккаунт
					</Link>
				</div>
			)}

			<div className="mt-6">
				<h2>Все отзывы</h2>

				{reviews.length === 0 ? (
					<p className="muted">Пока нет отзывов. Будьте первым!</p>
				) : (
					<div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
						{reviews.map((review) => (
							<div key={review.id} className="review-item">
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'flex-start',
									}}
								>
									<div>
										<div style={{ fontWeight: 600 }}>
											{review.userName}
										</div>
										<div className="small muted">
											Дата: {review.date}
										</div>
										<div style={{ marginTop: 8 }}>
											{'★'.repeat(review.rating)}
										</div>
									</div>

									{localUser &&
									(localUser.isAdmin ||
										localUser.id === review.userId) ? (
										<div>
											<button
												className="btn-outline"
												onClick={() => handleDelete(review.id)}
												type="button"
											>
												Удалить
											</button>
										</div>
									) : null}
								</div>

								<p style={{ marginTop: 10 }}>{review.text}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ReviewsPage;
