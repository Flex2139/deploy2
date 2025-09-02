import express from 'express';
import Room from '../models/room.js';

const router = express.Router();

router.post('/seed-rooms', async (req, res, next) => {
	try {
		if (process.env.ENABLE_SEED !== 'true') {
			return res.status(403).json({ message: 'Dev seeding disabled' });
		}

		const possiblePaths = [
			'../../frontend/src/data/rooms-data.js',
			'../../../frontend/src/data/rooms-data.js',
		];

		let rooms = [];
		for (const p of possiblePaths) {
			try {
				const mod = await import(p);
				rooms = mod.default || mod.rooms || mod.roomsData || [];
				if (rooms && rooms.length) {
					console.log('Imported rooms from', p);
					break;
				}
			} catch (err) {}
		}

		if (!rooms.length) {
			return res.status(400).json({
				message: 'Rooms data not found in frontend. Check path and export.',
			});
		}

		// Очищаем коллекцию и записываем новые документы
		await Room.deleteMany({});
		const created = await Room.create(
			rooms.map((r) => ({
				title: r.name || r.title || 'Room',
				slug:
					r.slug ||
					(r.name
						? String(r.name).toLowerCase().replace(/\\s+/g, '-')
						: undefined),
				description: r.description || r.desc || '',
				price: r.price || r.cost || 0,
				capacity: r.capacity || r.guests || 1,
				amenities: r.amenities || r.facilities || [],
				images: r.images
					? Array.isArray(r.images)
						? r.images
						: [r.images]
					: r.image
					? [r.image]
					: [],
			})),
		);

		res.json({ message: 'Seed completed', seeded: created.length });
	} catch (err) {
		next(err);
	}
});

export default router;
