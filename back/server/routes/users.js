import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const protect = async (req, res, next) => {
	const token = req.header('Authorization')?.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id).select('-password');
		if (!user) {
			return res.status(401).json({ message: 'Пользователь не найден' });
		}
		req.user = {
			id: user._id.toString(),
			isAdmin: user.isAdmin || false,
		};
		next();
	} catch (err) {
		console.error('Ошибка авторизации:', err);
		res.status(401).json({ message: 'Токен недействителен' });
	}
};

export const isAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(403).json({ message: 'Доступ запрещён: только админ' });
	}
};

export default protect;
