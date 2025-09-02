import express from 'express';
import { protect, isAdmin } from '../middleware/auth.js';
import {
	getRooms,
	getRoomById,
	createRoom,
	updateRoom,
	deleteRoom,
} from '../controllers/roomsController.js';

const router = express.Router();

router.get('/', getRooms);
router.get('/:id', getRoomById);

router.post('/', protect, isAdmin, createRoom);
router.put('/:id', protect, isAdmin, updateRoom);
router.delete('/:id', protect, isAdmin, deleteRoom);

export default router;
