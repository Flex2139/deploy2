import React from 'react';

export default function Footer() {
	return (
		<footer className="site-footer">
			<div className="container footer-inner">
				<div>
					<div className="small">Телефон: +7 (3952) 123-456</div>
					<div className="small">Email: info@example.ru</div>
				</div>
				<div className="small muted">
					© {new Date().getFullYear()} Отель "Жемчужина Байкала"
				</div>
			</div>
		</footer>
	);
}
