import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const reviews = await Review.find().populate('user', 'name');
		res.json(reviews);
	} catch (err) {
		console.error('Ошибка получения отзывов:', err);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});

router.post('/', protect, async (req, res) => {
	try {
		const { text, rating, room } = req.body;
		const review = await Review.create({
			user: req.user.id,
			room,
			text,
			rating: rating || 0,
		});
		res.status(201).json(review);
	} catch (err) {
		console.error('Ошибка создания отзыва:', err);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});

router.delete('/:id', protect, async (req, res) => {
	try {
		const review = await Review.findById(req.params.id);
		if (!review) return res.status(404).json({ message: 'Отзыв не найден' });

		if (!req.user.isAdmin && String(review.user) !== req.user.id) {
			return res.status(403).json({ message: 'Можно удалять только свои отзывы' });
		}

		await review.deleteOne();
		return res.json({ message: 'Отзыв удалён' });
	} catch (err) {
		console.error('Ошибка удаления отзыва:', err);
		return res.status(500).json({ message: 'Ошибка сервера' });
	}
});

export default router;
