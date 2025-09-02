import Booking from '../models/booking.js';
import Room from '../models/room.js';

export async function createBooking(req, res, next) {
	try {
		const { room: roomId, checkIn, checkOut, guests } = req.body;
		if (!roomId || !checkIn || !checkOut)
			return res.status(400).json({ message: 'Missing fields' });

		const room = await Room.findById(roomId);
		if (!room) return res.status(404).json({ message: 'Room not found' });

		const booking = await Booking.create({
			user: req.user._id,
			room: roomId,
			checkIn: new Date(checkIn),
			checkOut: new Date(checkOut),
			guests: guests || 1,
		});

		res.status(201).json(booking);
	} catch (err) {
		next(err);
	}
}

export async function getUserBookings(req, res, next) {
	try {
		const bookings = await Booking.find({ user: req.user._id })
			.populate('room')
			.lean();
		res.json(bookings);
	} catch (err) {
		next(err);
	}
}

export async function deleteBooking(req, res, next) {
	try {
		const booking = await Booking.findById(req.params.id);
		if (!booking) return res.status(404).json({ message: 'Booking not found' });
		if (!booking.user.equals(req.user._id) && req.user.role !== 'admin') {
			return res.status(403).json({ message: 'Forbidden' });
		}
		await booking.deleteOne();
		res.json({ message: 'Deleted' });
	} catch (err) {
		next(err);
	}
}
