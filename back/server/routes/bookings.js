import { Router } from 'express';
import Booking from '../models/booking.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/bookings', protect, async (req, res) => {
	try {
		const query = req.user.isAdmin ? {} : { user: req.user.id };
		const items = await Booking.find(query).sort({ createdAt: -1 });
		res.json(items);
	} catch (err) {
		console.error('GET /bookings error:', err);
		res.status(500).json({ message: 'Ошибка загрузки бронирований' });
	}
});

router.post('/bookings', protect, async (req, res) => {
	try {
		const { room, checkIn, checkOut, guests = 1 } = req.body;
		if (!room || !checkIn || !checkOut) {
			return res
				.status(400)
				.json({ message: 'room, checkIn, checkOut обязательны' });
		}

		const created = await Booking.create({
			user: req.user.id,
			room,
			checkIn,
			checkOut,
			guests,
		});

		res.status(201).json(created);
	} catch (err) {
		console.error('POST /bookings error:', err);
		res.status(500).json({ message: 'Ошибка создания брони' });
	}
});

router.put('/bookings/:id', protect, async (req, res) => {
	try {
		const b = await Booking.findById(req.params.id);
		if (!b) return res.status(404).json({ message: 'Бронь не найдена' });

		const isOwner = b.user?.toString?.() === req.user.id;
		if (!isOwner && !req.user.isAdmin) {
			return res.status(403).json({ message: 'Недостаточно прав' });
		}

		const { checkIn, checkOut, guests } = req.body;
		if (checkIn !== undefined) b.checkIn = checkIn;
		if (checkOut !== undefined) b.checkOut = checkOut;
		if (guests !== undefined) b.guests = guests;

		await b.save();
		res.json(b);
	} catch (err) {
		console.error('PUT /bookings/:id error:', err);
		res.status(500).json({ message: 'Ошибка обновления брони' });
	}
});

router.delete('/bookings/:id', protect, async (req, res) => {
	try {
		const b = await Booking.findById(req.params.id);
		if (!b) return res.status(404).json({ message: 'Бронь не найдена' });

		const isOwner = b.user?.toString?.() === req.user.id;
		if (!isOwner && !req.user.isAdmin) {
			return res.status(403).json({ message: 'Недостаточно прав' });
		}

		await b.deleteOne();
		res.json({ ok: true });
	} catch (err) {
		console.error('DELETE /bookings/:id error:', err);
		res.status(500).json({ message: 'Ошибка удаления брони' });
	}
});

export default router;
