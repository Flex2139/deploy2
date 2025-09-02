import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const publicUser = (u) => {
	if (!u) return null;
	const { _id, name, email, role, createdAt, updatedAt } = u;
	return { id: _id?.toString?.() ?? _id, name, email, role, createdAt, updatedAt };
};

export const register = async (req, res) => {
	try {
		const { name = '', email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: 'Email и пароль обязательны' });
		}

		const exists = await User.findOne({ email });
		if (exists) {
			return res
				.status(400)
				.json({ message: 'Пользователь с таким email уже существует' });
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const user = await User.create({
			name: name || email.split('@')[0],
			email,
			passwordHash,
			role: 'guest',
		});

		const token = signToken(user._id);
		return res.status(201).json({ token, user: publicUser(user) });
	} catch (err) {
		console.error('register error:', err);
		return res.status(500).json({ message: 'Ошибка регистрации' });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body ?? {};
		if (!email || !password) {
			return res.status(400).json({ message: 'Email и пароль обязательны' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const ok = await bcrypt.compare(password, user.passwordHash);
		if (!ok) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = signToken(user._id);
		return res.json({ token, user: publicUser(user) });
	} catch (err) {
		console.error('login error:', err);
		return res.status(500).json({ message: 'Ошибка входа' });
	}
};

export const me = async (req, res) => {
	return res.json(publicUser(req.user));
};
