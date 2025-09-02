import React from 'react';

const images = [
	'/images/gallery/gallery1.jpg',
	'/images/gallery/gallery2.jpg',
	'/images/gallery/gallery3.jpg',
	'/images/gallery/gallery4.jpg',
	'/images/gallery/gallery5.jpg',
	'/images/gallery/gallery6.jpg',
	'/images/gallery/gallery7.jpg',
	'/images/gallery/gallery8.jpg',
	'/images/gallery/gallery9.jpg',
];

export default function GalleryPage() {
	return (
		<div className="container mt-6">
			<h1>Галерея</h1>
			<p className="muted">Фото наших услуг.</p>

			<div className="gallery-grid">
				{images.map((src, i) => (
					<div key={i} className="gallery-item">
						<img
							src={src}
							alt={`Галерея ${i + 1}`}
							loading="lazy"
							width="1200"
							height="800"
							style={{ objectFit: 'cover', width: '100%', height: '100%' }}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
