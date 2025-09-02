import React from 'react';

const kitchen = [
	'/images/services/kitchen1.jpg',
	'/images/services/kitchen2.jpg',
	'/images/services/kitchen3.jpg',
];
const excursion = [
	'/images/services/excursion1.jpg',
	'/images/services/excursion2.jpg',
	'/images/services/excursion3.jpg',
];
const banya = [
	'/images/services/banya1.jpg',
	'/images/services/banya2.jpg',
	'/images/services/banya3.jpg',
];

function Section({ title, images }) {
	return (
		<section style={{ marginTop: 22 }}>
			<h2>{title}</h2>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3,1fr)',
					gap: 12,
					marginTop: 12,
				}}
			>
				{images.map((s, idx) => (
					<div key={idx} className="card">
						<img
							src={s}
							alt={`${title} ${idx + 1}`}
							loading="lazy"
							style={{
								width: '100%',
								height: 180,
								objectFit: 'cover',
								display: 'block',
							}}
						/>
					</div>
				))}
			</div>
		</section>
	);
}

export default function ServicesPage() {
	return (
		<div className="container mt-6">
			<h1>Услуги</h1>
			<p className="muted">Мы предлагаем ресторан, экскурсии и баню.</p>

			<Section title="Ресторан и кухня" images={kitchen} />
			<Section title="Экскурсии" images={excursion} />
			<Section title="Баня и релакс" images={banya} />
		</div>
	);
}
