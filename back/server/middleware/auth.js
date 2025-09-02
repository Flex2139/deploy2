import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const protect = async (req, res, next) => {
	const header = req.header('Authorization');
	const token = header?.startsWith('Bearer ') ? header.split(' ')[1] : null;

	if (!token) {
		return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id).select('-passwordHash -__v');

		if (!user) {
			return res.status(401).json({ message: 'Пользователь не найден' });
		}

		req.user = {
			id: user._id.toString(),
			isAdmin: user.role === 'admin',
			...user.toObject(),
		};

		next();
	} catch (err) {
		console.error('Ошибка авторизации:', err);
		return res.status(401).json({ message: 'Токен недействителен' });
	}
};

/**
 * Только для админа
 */
export const isAdmin = (req, res, next) => {
	if (req.user?.isAdmin) return next();
	return res.status(403).json({ message: 'Доступ запрещён: только админ' });
};
