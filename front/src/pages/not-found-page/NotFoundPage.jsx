import { Link } from 'react-router-dom';

export default function NotFoundPage() {
	return (
		<div className="not-found">
			<h1>404 - Страница не найдена</h1>
			<p>Извините, запрашиваемая страница не существует.</p>
			<Link to="/" className="button">
				Вернуться на главную
			</Link>
		</div>
	);
}
