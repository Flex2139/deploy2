import Room from '../models/room.js';

export async function getRooms(req, res, next) {
	try {
		const rooms = await Room.find().lean();
		res.json(rooms);
	} catch (err) {
		next(err);
	}
}

export async function getRoomById(req, res, next) {
	try {
		const room = await Room.findById(req.params.id).lean();
		if (!room) return res.status(404).json({ message: 'Room not found' });
		res.json(room);
	} catch (err) {
		next(err);
	}
}

export const updateRoom = async (req, res, next) => {
	try {
		const updated = await Room.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updated) {
			return res.status(404).json({ message: 'Комната не найдена' });
		}
		res.json(updated);
	} catch (err) {
		next(err);
	}
};

export const deleteRoom = async (req, res, next) => {
	try {
		const deleted = await Room.findByIdAndDelete(req.params.id);
		if (!deleted) {
			return res.status(404).json({ message: 'Комната не найдена' });
		}
		res.json({ message: 'Комната удалена' });
	} catch (err) {
		next(err);
	}
};

export const createRoom = async (req, res, next) => {
	try {
		const room = await Room.create(req.body);
		res.status(201).json(room);
	} catch (err) {
		next(err);
	}
};
