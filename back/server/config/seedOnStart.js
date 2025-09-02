let alreadySeeded = false;

export default async function seedOnStart() {
	if (alreadySeeded) {
		console.log('⏭ Seed skipped — already run in this session');
		return 0;
	}
	alreadySeeded = true;

	const Room = (await import('../models/room.js')).default;

	try {
		const existingCount = await Room.countDocuments();
		if (existingCount > 0) {
			console.log(`Rooms collection not empty (${existingCount}), skipping seed`);
			return 0;
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
				if (rooms.length) {
					console.log(`Imported rooms from ${p}`);
					break;
				}
			} catch (err) {
				// тихо пропускаем, пробуем следующий путь
			}
		}

		if (!rooms.length) {
			console.error('❌ No rooms data found in frontend — check path and export');
			return 0;
		}

		const created = await Room.insertMany(
			rooms.map((r) => ({
				title: r.name || r.title || 'Room',
				slug:
					r.slug ||
					(r.name
						? String(r.name).toLowerCase().replace(/\s+/g, '-')
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

		return created.length;
	} catch (err) {
		console.error('❌ Seed error:', err);
		return 0;
	}
}
