import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Room from '../models/room.js';

async function importRooms() {
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
		} catch (err) {
			// console.warn('import error for', p, err.message);
		}
	}

	if (!rooms.length) {
		console.warn(
			'No rooms data found in frontend. Please check path and export in frontend/src/data/rooms-data.js',
		);
		return;
	}

	const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/baikal_hotel';
	await mongoose.connect(mongoUri);
	console.log('Mongo connected for seeding');

	await Room.deleteMany({});
	const created = await Room.create(
		rooms.map((r) => ({
			title: r.name || r.title || 'Room',
			slug:
				r.slug ||
				(r.name ? String(r.name).toLowerCase().replace(/\s+/g, '-') : undefined),
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
	console.log('Seeded rooms:', created.length);
	await mongoose.disconnect();
}

importRooms().catch((err) => {
	console.error('Seed error:', err);
	process.exit(1);
});
