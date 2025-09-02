import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export async function getMe(req, res, next) {
	try {
		res.json({ user: req.user });
	} catch (err) {
		next(err);
	}
}

export async function updateMe(req, res, next) {
	try {
		const updates = {};
		if (req.body.name) updates.name = req.body.name;
		if (req.body.email) updates.email = req.body.email;
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			updates.passwordHash = await bcrypt.hash(req.body.password, salt);
		}

		const user = await User.findByIdAndUpdate(req.user._id, updates, {
			new: true,
		}).select('-passwordHash');
		res.json({ user });
	} catch (err) {
		next(err);
	}
}
